"use client";

import { Children, isValidElement, useState } from "react";

export default function HoverGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={className}>
      {items.map((child, index) => {
        const isHovered = hovered === index;
        const isSibling = hovered !== null && hovered !== index;

        return (
          <div
            key={child.key ?? index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`transition-all duration-300 ease-out will-change-transform ${
              isHovered ? "z-10 -translate-y-2 scale-[1.035]" : ""
            } ${isSibling ? "animate-giggle scale-[0.98] opacity-90" : ""}`}
            style={
              isHovered
                ? {
                    filter:
                      "drop-shadow(0 18px 30px rgba(61,155,233,0.4)) drop-shadow(0 4px 10px rgba(0,32,63,0.25))",
                  }
                : undefined
            }
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
