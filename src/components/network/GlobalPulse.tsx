"use client";

import { useEffect, useRef } from "react";

/**
 * The dot-matrix globe behind the Network hero: coastline points traced from
 * real data, a sparse plexus mesh with travelling signal pulses, and coloured
 * long-haul arcs between hub cities. The 6,500 coastline points are fetched
 * rather than bundled so the hero paints before they arrive.
 */

type Vec3 = { x: number; y: number; z: number };

const COASTLINE_URL = "/data/globe-coastline.json";

const DOT_PALETTE = [
  "95,227,255", // bright cyan
  "31,126,201", // mid blue
  "12,58,99", // dim navy
  "150,200,255", // pale blue
  "210,235,255", // pale blue-white
];

const ROUTE_COLORS = [
  "255,214,10", // yellow
  "255,69,58", // red
  "255,138,26", // orange
  "48,209,120", // green
  "64,169,255", // blue
];

const HUBS = [
  { lat: 40.71, lon: -74.01 }, // New York
  { lat: 51.51, lon: -0.13 }, // London
  { lat: 52.52, lon: 13.4 }, // Berlin
  { lat: 6.52, lon: 3.38 }, // Lagos
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 19.08, lon: 72.88 }, // Mumbai
  { lat: 1.35, lon: 103.82 }, // Singapore
  { lat: 37.57, lon: 126.98 }, // Seoul
  { lat: 35.68, lon: 139.69 }, // Tokyo
  { lat: -33.87, lon: 151.21 }, // Sydney
  { lat: -23.55, lon: -46.63 }, // São Paulo
  { lat: 37.77, lon: -122.42 }, // San Francisco
];

const MESH_N = 230;

function toXYZ(lat: number, lon: number): Vec3 {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  const cphi = Math.cos(phi);
  return {
    x: cphi * Math.sin(lambda),
    y: Math.sin(phi),
    z: cphi * Math.cos(lambda),
  };
}

function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = [];
  const offset = 2 / n;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    pts.push({ x: Math.cos(phi) * r, y, z: Math.sin(phi) * r });
  }
  return pts;
}

function angDist(a: Vec3, b: Vec3) {
  const dot = a.x * b.x + a.y * b.y + a.z * b.z;
  return Math.acos(Math.max(-1, Math.min(1, dot)));
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const theta = Math.acos(dot) * t;
  let relx = b.x - a.x * dot;
  let rely = b.y - a.y * dot;
  let relz = b.z - a.z * dot;
  const len = Math.sqrt(relx * relx + rely * rely + relz * relz) || 1;
  relx /= len;
  rely /= len;
  relz /= len;
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  return {
    x: a.x * ct + relx * st,
    y: a.y * ct + rely * st,
    z: a.z * ct + relz * st,
  };
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export default function GlobalPulse({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const meshNodes = fibonacciSphere(MESH_N).map((p, i) => ({
      ...p,
      hub: (i * 37) % MESH_N < MESH_N * 0.09,
    }));

    const meshEdges: [number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < meshNodes.length; i++) {
      const dists: [number, number][] = [];
      for (let j = 0; j < meshNodes.length; j++) {
        if (i === j) continue;
        dists.push([angDist(meshNodes[i], meshNodes[j]), j]);
      }
      dists.sort((a, b) => a[0] - b[0]);
      for (let n = 0; n < Math.min(3, dists.length); n++) {
        if (dists[n][0] > 0.55) continue;
        const a = Math.min(i, dists[n][1]);
        const b = Math.max(i, dists[n][1]);
        const key = `${a}_${b}`;
        if (seen.has(key)) continue;
        seen.add(key);
        meshEdges.push([a, b]);
      }
    }

    const hubPoints = HUBS.map((h) => toXYZ(h.lat, h.lon));

    let landPoints: Vec3[] = [];
    let landColors: string[] = [];

    let W = 0;
    let H = 0;
    let dpr = 1;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    let yaw = 1.55;
    let pitch = 0.58;
    const autoSpeed = reduceMotion ? 0 : 0.00065;

    const rotate = (p: Vec3) => {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const x1 = p.x * cy + p.z * sy;
      const z1 = -p.x * sy + p.z * cy;
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      return [x1, p.y * cp - z1 * sp, p.y * sp + z1 * cp] as const;
    };

    let R = 0;
    let cx = 0;
    let cy = 0;
    let camD = 0;
    const project = (p: readonly [number, number, number]) => {
      const scale = camD / (camD - p[2] * R);
      return [cx + p[0] * R * scale, cy - p[1] * R * scale] as const;
    };

    type Pulse = { a: Vec3; b: Vec3; start: number; dur: number };
    type Route = { pts: Vec3[]; start: number; dur: number; col: string };
    const pulses: Pulse[] = [];
    const routes: Route[] = [];
    let nextSpawn = 0;
    let nextRouteSpawn = 0;

    const spawnPulse = (now: number) => {
      if (pulses.length >= 10 || meshEdges.length === 0) return;
      const e = meshEdges[(Math.random() * meshEdges.length) | 0];
      pulses.push({
        a: meshNodes[e[0]],
        b: meshNodes[e[1]],
        start: now,
        dur: 900 + Math.random() * 900,
      });
    };

    const spawnRoute = (now: number) => {
      if (routes.length >= 15) return;
      const a = hubPoints[(Math.random() * hubPoints.length) | 0];
      const b =
        Math.random() < 0.55 || landPoints.length === 0
          ? hubPoints[(Math.random() * hubPoints.length) | 0]
          : landPoints[(Math.random() * landPoints.length) | 0];
      if (a === b || angDist(a, b) < 0.5) return;
      const samples = 44;
      const height = 0.14 + Math.min(0.34, angDist(a, b) * 0.16);
      const pts: Vec3[] = [];
      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const p = slerp(a, b, t);
        const lift = 1 + height * Math.sin(Math.PI * t);
        pts.push({ x: p.x * lift, y: p.y * lift, z: p.z * lift });
      }
      routes.push({
        pts,
        start: now,
        dur: 2600 + Math.random() * 1400,
        col: ROUTE_COLORS[(Math.random() * ROUTE_COLORS.length) | 0],
      });
    };

    let raf = 0;

    const frame = (now: number) => {
      yaw += autoSpeed;

      // Framed for the hero: the dome sits low and right of centre so its
      // top edge crosses behind the copy and it runs off the bottom corner.
      R = H * 0.72;
      cx = W * 0.58;
      cy = H * 1.12;
      camD = R * 3.1;

      ctx.clearRect(0, 0, W, H);

      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#020810");
      sky.addColorStop(0.28, "#04162e");
      sky.addColorStop(0.55, "#0a3d6b");
      sky.addColorStop(0.74, "#062348");
      sky.addColorStop(1, "#010509");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      const glow = ctx.createRadialGradient(
        cx,
        cy - R * 0.55,
        R * 0.1,
        cx,
        cy - R * 0.3,
        R * 1.2,
      );
      glow.addColorStop(0, "rgba(70,180,240,0.55)");
      glow.addColorStop(0.55, "rgba(20,90,160,0.22)");
      glow.addColorStop(1, "rgba(2,8,16,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      ctx.lineWidth = Math.max(0.6, R / 780);
      for (const e of meshEdges) {
        const pa = rotate(meshNodes[e[0]]);
        const pb = rotate(meshNodes[e[1]]);
        const v = Math.min(
          smoothstep(-0.08, 0.18, pa[2]),
          smoothstep(-0.08, 0.18, pb[2]),
        );
        if (v <= 0.02) continue;
        const qa = project(pa);
        const qb = project(pb);
        ctx.beginPath();
        ctx.moveTo(qa[0], qa[1]);
        ctx.lineTo(qb[0], qb[1]);
        ctx.strokeStyle = `rgba(140,205,255,${(v * 0.32).toFixed(2)})`;
        ctx.stroke();
      }

      for (const node of meshNodes) {
        const pr = rotate(node);
        const vn = smoothstep(-0.08, 0.18, pr[2]);
        if (vn <= 0.02) continue;
        const qn = project(pr);
        const rad = node.hub ? Math.max(1.4, R / 190) : Math.max(0.8, R / 320);
        if (node.hub) {
          const hg = ctx.createRadialGradient(
            qn[0],
            qn[1],
            0,
            qn[0],
            qn[1],
            rad * 5,
          );
          hg.addColorStop(0, `rgba(191,233,255,${(0.5 * vn).toFixed(2)})`);
          hg.addColorStop(1, "rgba(191,233,255,0)");
          ctx.beginPath();
          ctx.arc(qn[0], qn[1], rad * 5, 0, Math.PI * 2);
          ctx.fillStyle = hg;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(qn[0], qn[1], rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,240,255,${(0.75 * vn).toFixed(2)})`;
        ctx.fill();
      }

      for (let i = 0; i < landPoints.length; i++) {
        const r = rotate(landPoints[i]);
        const vis = smoothstep(-0.1, 0.16, r[2]);
        if (vis <= 0.01) continue;
        const proj = project(r);
        const radd = (0.85 + 0.85 * Math.max(0, r[2])) * (R / 320);
        ctx.beginPath();
        ctx.arc(proj[0], proj[1], Math.max(0.5, radd), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${landColors[i]},${(0.22 + vis * 0.72).toFixed(2)})`;
        ctx.fill();
      }

      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        const t = (now - pulse.start) / pulse.dur;
        if (t >= 1) {
          pulses.splice(pi, 1);
          continue;
        }
        const fade = t < 0.2 ? t / 0.2 : t > 0.75 ? (1 - t) / 0.25 : 1;
        const mix = {
          x: pulse.a.x + (pulse.b.x - pulse.a.x) * t,
          y: pulse.a.y + (pulse.b.y - pulse.a.y) * t,
          z: pulse.a.z + (pulse.b.z - pulse.a.z) * t,
        };
        const len =
          Math.sqrt(mix.x * mix.x + mix.y * mix.y + mix.z * mix.z) || 1;
        mix.x /= len;
        mix.y /= len;
        mix.z /= len;
        const pm = rotate(mix);
        const vp = smoothstep(-0.08, 0.18, pm[2]);
        if (vp <= 0.04) continue;
        const qp = project(pm);
        const prad = Math.max(1.2, R / 260);
        const pg = ctx.createRadialGradient(
          qp[0],
          qp[1],
          0,
          qp[0],
          qp[1],
          prad * 5,
        );
        pg.addColorStop(0, `rgba(230,252,255,${(vp * fade).toFixed(2)})`);
        pg.addColorStop(1, "rgba(230,252,255,0)");
        ctx.beginPath();
        ctx.arc(qp[0], qp[1], prad * 5, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(qp[0], qp[1], prad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(vp * fade).toFixed(2)})`;
        ctx.fill();
      }

      for (let ri = routes.length - 1; ri >= 0; ri--) {
        const route = routes[ri];
        const rt = (now - route.start) / route.dur;
        if (rt >= 1) {
          routes.splice(ri, 1);
          continue;
        }
        const rfade = rt < 0.15 ? rt / 0.15 : rt > 0.8 ? (1 - rt) / 0.2 : 1;

        ctx.lineWidth = Math.max(0.8, R / 260);
        for (let s = 0; s < route.pts.length - 1; s++) {
          const p1 = rotate(route.pts[s]);
          const p2 = rotate(route.pts[s + 1]);
          const segVis = Math.min(
            smoothstep(-0.05, 0.2, p1[2]),
            smoothstep(-0.05, 0.2, p2[2]),
          );
          if (segVis <= 0.02) continue;
          const q1 = project(p1);
          const q2 = project(p2);
          ctx.beginPath();
          ctx.moveTo(q1[0], q1[1]);
          ctx.lineTo(q2[0], q2[1]);
          ctx.strokeStyle = `rgba(${route.col},${(segVis * rfade * 0.9).toFixed(2)})`;
          ctx.stroke();
        }

        const rIdx = Math.max(0, Math.min(1, rt / 0.85)) * (route.pts.length - 1);
        const i0 = Math.min(route.pts.length - 2, Math.floor(rIdx));
        const ft = rIdx - i0;
        const ra = rotate(route.pts[i0]);
        const rb = rotate(route.pts[i0 + 1]);
        const rmix = [
          ra[0] + (rb[0] - ra[0]) * ft,
          ra[1] + (rb[1] - ra[1]) * ft,
          ra[2] + (rb[2] - ra[2]) * ft,
        ] as const;
        const rvis = smoothstep(-0.05, 0.2, rmix[2]);
        if (rvis > 0.05) {
          const rp = project(rmix);
          const rpr = Math.max(1.4, R / 150);
          const rg = ctx.createRadialGradient(
            rp[0],
            rp[1],
            0,
            rp[0],
            rp[1],
            rpr * 4,
          );
          rg.addColorStop(0, `rgba(${route.col},${(rvis * rfade).toFixed(2)})`);
          rg.addColorStop(1, `rgba(${route.col},0)`);
          ctx.beginPath();
          ctx.arc(rp[0], rp[1], rpr * 4, 0, Math.PI * 2);
          ctx.fillStyle = rg;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(rp[0], rp[1], rpr * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${(rvis * rfade).toFixed(2)})`;
          ctx.fill();
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const spot = ctx.createRadialGradient(
        cx,
        cy - R * 0.98,
        R * 0.05,
        cx,
        cy - R * 0.1,
        R * 1.35,
      );
      spot.addColorStop(0, "rgba(215,240,255,0.4)");
      spot.addColorStop(0.35, "rgba(150,205,255,0.16)");
      spot.addColorStop(0.7, "rgba(90,160,220,0.05)");
      spot.addColorStop(1, "rgba(90,160,220,0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      const vig = ctx.createRadialGradient(
        cx,
        H * 0.22,
        H * 0.25,
        cx,
        H * 0.55,
        H * 0.95,
      );
      vig.addColorStop(0, "rgba(2,8,16,0)");
      vig.addColorStop(1, "rgba(2,8,16,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      if (!reduceMotion) {
        if (now >= nextSpawn) {
          spawnPulse(now);
          nextSpawn = now + 140 + Math.random() * 220;
        }
        if (now >= nextRouteSpawn) {
          spawnRoute(now);
          nextRouteSpawn = now + 120 + Math.random() * 180;
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    const controller = new AbortController();
    fetch(COASTLINE_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((dots: [number, number][]) => {
        landPoints = dots.map((d) => toXYZ(d[0], d[1]));
        landColors = landPoints.map(
          () => DOT_PALETTE[(Math.random() * DOT_PALETTE.length) | 0],
        );
      })
      .catch(() => {
        // The mesh and arcs still carry the hero if the coastline never lands.
      });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      controller.abort();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block size-full ${className}`}
    />
  );
}
