"use client";

import { useEffect, useRef, useState } from "react";
import { CHAPTER_COUNTRIES } from "@/lib/network/chapterCountries";
import { flag } from "@/lib/i18n/display";

/**
 * The globe behind the Network hero: a lit, Google-Earth-style ocean sphere
 * in one blue palette, real continents filled in as solid, nearly-opaque
 * shapes (not a stippled dot cloud), an atmospheric rim glow, and coloured
 * long-haul arcs between hub cities. A glowing marker sits at every one of
 * YEF's 68 chapter countries.
 *
 * The land data is a coarse equal-area sample of land/ocean cells (each
 * point is a cell centre, with the cell's angular size widening toward the
 * poles to match its native sampling density); each is drawn as a quad
 * sized to butt up against its neighbours, so adjoining land cells merge
 * into one crisp, continuous coastline instead of leaving gaps or blurring
 * into the ocean.
 *
 * It is draggable and the markers are hoverable/clickable — a reader can
 * spin it to see the span of the network for themselves, not just watch it
 * turn.
 */

type Vec3 = { x: number; y: number; z: number };

const COASTLINE_URL = "/data/globe-coastline.json";

/** Native spacing of the land-cell sample, in degrees — see file doc above. */
const LAND_LAT_STEP = 1.35;
const LAND_LON_STEP_AT_EQUATOR = 1.36;

// One blue family throughout, Google-Earth style — the routes vary in
// brightness, not hue.
const ROUTE_COLORS = [
  "120,210,255", // bright sky
  "80,170,255", // mid azure
  "160,225,255", // pale cyan
  "50,140,230", // deeper blue
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

/** A chapter country marker, positioned on the sphere and ready to hit-test. */
type Marker = { code: string; name: string; pos: Vec3 };

type Tooltip = { x: number; y: number; label: string; code: string };

export default function GlobalPulse({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const markers: Marker[] = CHAPTER_COUNTRIES.map((c) => ({
      code: c.code,
      name: c.name,
      pos: toXYZ(c.lat, c.lon),
    }));

    const hubPoints = HUBS.map((h) => toXYZ(h.lat, h.lon));

    /** Each land cell's four corners, pre-computed once the data arrives. */
    let landCells: Vec3[][] = [];

    let W = 0;
    let H = 0;
    let dpr = 1;

    // Land is drawn onto this offscreen buffer first, then composited onto
    // the main canvas with a small blur — that rounds the coarse data's
    // sharp quad corners into the smooth, satellite-photo-like coastlines a
    // Google-Earth-style globe calls for, without the whole shape melting
    // together the way a much larger blur (or big overlapping circles) did.
    const landBuffer = document.createElement("canvas");
    const landCtx = landBuffer.getContext("2d");

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
      landBuffer.width = canvas.width;
      landBuffer.height = canvas.height;
      landCtx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    let yaw = 1.55;
    let pitch = 0.58;
    const autoSpeed = reduceMotion ? 0 : 0.00065;

    // Dragging (and hovering a marker) holds the auto-rotate for a beat so a
    // reader's own spin doesn't immediately get fought or lost.
    let dragging = false;
    let dragMoved = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastInteraction = 0;
    let hoverIndex = -1;
    let markerScreen: { x: number; y: number; r: number; i: number }[] = [];

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

    type Route = { pts: Vec3[]; start: number; dur: number; col: string };
    const routes: Route[] = [];
    let nextRouteSpawn = 0;

    const spawnRoute = (now: number) => {
      if (routes.length >= 15) return;
      const a = hubPoints[(Math.random() * hubPoints.length) | 0];
      const b =
        Math.random() < 0.6
          ? markers[(Math.random() * markers.length) | 0].pos
          : hubPoints[(Math.random() * hubPoints.length) | 0];
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
      if (!dragging && now - lastInteraction > 1200) yaw += autoSpeed;

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

      // A solid, lit sphere body — the silhouette of the globe itself, not a
      // point cloud standing in for one. Lit from the upper-left so it reads
      // as a volume, darkening toward its lower-right rim. Deep ocean blue
      // throughout, Google-Earth style, rather than a dark navy backdrop.
      const bodyR = R * (camD / Math.sqrt(Math.max(1, camD * camD - R * R)));
      const body = ctx.createRadialGradient(
        cx - bodyR * 0.35,
        cy - bodyR * 0.45,
        bodyR * 0.05,
        cx,
        cy,
        bodyR * 1.05,
      );
      body.addColorStop(0, "rgba(110,180,230,0.95)");
      body.addColorStop(0.32, "rgba(55,125,190,0.92)");
      body.addColorStop(0.68, "rgba(18,68,124,0.92)");
      body.addColorStop(1, "rgba(5,26,54,0.92)");
      ctx.beginPath();
      ctx.arc(cx, cy, bodyR, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      // Real continents, filled as solid shapes rather than scattered dots.
      // Drawn onto the offscreen buffer first (sharp quads, opaque enough to
      // read clearly against the ocean), then composited below with a small
      // blur — that rounds the coarse data's corners into smooth, satellite
      // -photo-like coastlines instead of either hard pixel edges or a
      // washed-out blob.
      if (landCtx) {
        landCtx.clearRect(0, 0, W, H);
        for (const corners of landCells) {
          let sumZ = 0;
          const q: (readonly [number, number])[] = [];
          for (const c of corners) {
            const r = rotate(c);
            sumZ += r[2];
            q.push(project(r));
          }
          const vis = smoothstep(-0.04, 0.14, sumZ / corners.length);
          if (vis <= 0.02) continue;
          landCtx.beginPath();
          landCtx.moveTo(q[0][0], q[0][1]);
          for (let k = 1; k < q.length; k++) landCtx.lineTo(q[k][0], q[k][1]);
          landCtx.closePath();
          landCtx.fillStyle = `rgba(225,242,255,${(0.82 + vis * 0.18).toFixed(2)})`;
          landCtx.fill();
        }

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        ctx.arc(cx * dpr, cy * dpr, bodyR * dpr, 0, Math.PI * 2);
        ctx.clip();
        ctx.filter = `blur(${Math.max(1, 3.2 * dpr).toFixed(1)}px)`;
        // Drawn twice, additively: the blur alone would leave every edge —
        // and the interior — equally soft. Compositing it again with
        // "lighter" pushes what was solid land back toward fully opaque
        // while the thin, once-jagged edges (which only pick up the blur's
        // faint tail from one pass) stay a soft gradient — smooth coastlines
        // without turning the whole shape hazy.
        ctx.drawImage(landBuffer, 0, 0);
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(landBuffer, 0, 0);
        ctx.restore();
      }

      // A crisp atmospheric rim right at the sphere's silhouette edge — the
      // thin, bright limb glow that makes a Google-Earth-style globe read as
      // an actual lit planet rather than a flat disc.
      const rim = ctx.createRadialGradient(cx, cy, bodyR * 0.94, cx, cy, bodyR * 1.09);
      rim.addColorStop(0, "rgba(170,220,255,0)");
      rim.addColorStop(0.7, "rgba(170,220,255,0.5)");
      rim.addColorStop(0.92, "rgba(210,240,255,0.75)");
      rim.addColorStop(1, "rgba(210,240,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, bodyR * 1.09, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      // Real chapter countries: glowing markers, screen positions recorded
      // this frame for hover/click hit-testing.
      const nextMarkerScreen: typeof markerScreen = [];
      for (let i = 0; i < markers.length; i++) {
        const r = rotate(markers[i].pos);
        const vis = smoothstep(-0.06, 0.18, r[2]);
        if (vis <= 0.02) continue;
        const q = project(r);
        const hovered = i === hoverIndex;
        const rad = (hovered ? 3.6 : 2.6) * (R / 300);
        nextMarkerScreen.push({ x: q[0], y: q[1], r: Math.max(9, rad * 2.6), i });

        const hg = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], rad * (hovered ? 6 : 4));
        hg.addColorStop(0, `rgba(255,205,110,${(vis * (hovered ? 0.55 : 0.32)).toFixed(2)})`);
        hg.addColorStop(1, "rgba(255,205,110,0)");
        ctx.beginPath();
        ctx.arc(q[0], q[1], rad * (hovered ? 6 : 4), 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(q[0], q[1], rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,180,${(0.55 + vis * 0.45).toFixed(2)})`;
        ctx.fill();
      }
      markerScreen = nextMarkerScreen;

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

      if (!reduceMotion && now >= nextRouteSpawn) {
        spawnRoute(now);
        nextRouteSpawn = now + 120 + Math.random() * 180;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    const findMarkerAt = (x: number, y: number) => {
      let best = -1;
      let bestDist = Infinity;
      for (const m of markerScreen) {
        const d = Math.hypot(m.x - x, m.y - y);
        if (d <= m.r && d < bestDist) {
          best = m.i;
          bestDist = d;
        }
      }
      return best;
    };

    const pointerPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragMoved = 0;
      lastInteraction = performance.now();
      const { x, y } = pointerPos(e);
      lastPointerX = x;
      lastPointerY = y;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const { x, y } = pointerPos(e);
      if (dragging) {
        const dx = x - lastPointerX;
        const dy = y - lastPointerY;
        dragMoved += Math.abs(dx) + Math.abs(dy);
        yaw += dx * 0.006;
        pitch = Math.max(-1.2, Math.min(1.2, pitch - dy * 0.006));
        lastPointerX = x;
        lastPointerY = y;
        lastInteraction = performance.now();
        return;
      }
      const hit = findMarkerAt(x, y);
      if (hit !== hoverIndex) {
        hoverIndex = hit;
        lastInteraction = performance.now();
        canvas.style.cursor = hit >= 0 ? "pointer" : "grab";
        setTooltip(
          hit >= 0
            ? { x, y, label: markers[hit].name, code: markers[hit].code }
            : null,
        );
      } else if (hit >= 0) {
        // Keep the tooltip pinned to the marker's current screen position
        // as the globe keeps turning under a held cursor.
        const m = markerScreen.find((s) => s.i === hit);
        if (m) setTooltip({ x: m.x, y: m.y, label: markers[hit].name, code: markers[hit].code });
      }
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      lastInteraction = performance.now();
    };

    const onClick = (e: PointerEvent) => {
      if (dragMoved > 6) return;
      const { x, y } = pointerPos(e);
      const hit = findMarkerAt(x, y);
      if (hit >= 0) {
        window.open(`/${markers[hit].code}`, "_blank", "noopener");
      }
    };

    const onPointerLeave = () => {
      endDrag();
      if (hoverIndex >= 0) {
        hoverIndex = -1;
        setTooltip(null);
        canvas.style.cursor = "grab";
      }
    };

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onClick);

    const controller = new AbortController();
    fetch(COASTLINE_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((cells: [number, number][]) => {
        landCells = cells.map(([lat, lon]) => {
          const cosLat = Math.max(0.06, Math.cos((lat * Math.PI) / 180));
          const latHalf = (LAND_LAT_STEP / 2) * 1.15;
          const lonHalf = Math.min(20, ((LAND_LON_STEP_AT_EQUATOR / cosLat) / 2) * 1.15);
          return [
            toXYZ(lat - latHalf, lon - lonHalf),
            toXYZ(lat - latHalf, lon + lonHalf),
            toXYZ(lat + latHalf, lon + lonHalf),
            toXYZ(lat + latHalf, lon - lonHalf),
          ];
        });
      })
      .catch(() => {
        // The ocean sphere and markers still carry the globe if the land data
        // never lands.
      });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      controller.abort();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="relative size-full">
      <canvas ref={canvasRef} aria-hidden="true" className={`block size-full ${className}`} />
      {tooltip && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-[calc(100%+14px)] items-center gap-2 rounded-full border border-white/15 bg-[#030a16]/90 px-3 py-1.5 text-sm text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <span aria-hidden="true">{flag(tooltip.code)}</span>
          <span className="font-medium">{tooltip.label}</span>
        </div>
      )}
    </div>
  );
}
