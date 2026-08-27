"use client";

import { useEffect, useRef } from "react";

/**
 * The flowing blue field behind The Call.
 *
 * Four stacked layers: a slowly rotating conic wash, three drifting blobs for
 * depth, a silk-like shine sweeping across, and a fine grain. A light follows
 * the pointer and the whole field parallaxes with it.
 *
 * The pointer loop only runs while the pointer is actually over the section —
 * the original ran a requestAnimationFrame forever, which keeps a tab busy
 * even when the section is off screen.
 */
export default function FlowingBackground() {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const wash = useRef<HTMLDivElement>(null);
  const blobs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const depth = [0.5, -0.35, 0.7];
    let targetX = 0.5;
    let targetY = 0.5;
    let curX = 0.5;
    let curY = 0.5;
    let frame = 0;

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      const offX = (curX - 0.5) * 100;
      const offY = (curY - 0.5) * 100;

      if (glow.current) {
        glow.current.style.left = `${curX * 100}%`;
        glow.current.style.top = `${curY * 100}%`;
      }
      blobs.current.forEach((b, i) => {
        if (b) b.style.transform = `translate(${offX * depth[i]}px, ${offY * depth[i]}px)`;
      });
      if (wash.current) {
        wash.current.style.transform = `translate(${offX * 0.15}px, ${offY * 0.15}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
    };
    const onEnter = () => {
      if (glow.current) glow.current.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      if (glow.current) glow.current.style.opacity = "0";
      targetX = 0.5;
      targetY = 0.5;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={wash} className="absolute inset-0 will-change-transform">
        <div className="yef-flow-wash" />
      </div>
      {["yef-flow-b1", "yef-flow-b2", "yef-flow-b3"].map((cls, i) => (
        <div
          key={cls}
          ref={(node) => {
            blobs.current[i] = node;
          }}
          className="absolute inset-0 will-change-transform"
        >
          <div className={`yef-flow-blob ${cls}`} />
        </div>
      ))}
      <div className="yef-flow-shine" />
      <div ref={glow} className="yef-flow-glow" />
      <div className="yef-flow-grain" />
    </div>
  );
}
