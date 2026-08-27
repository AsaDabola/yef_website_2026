"use client";

import { Children, isValidElement, useState } from "react";

export default function HoverGroup({
  children,
  className,
  itemClassName = "",
  ref,
  onScroll,
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  ref?: React.Ref<HTMLDivElement>;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div ref={ref} onScroll={onScroll} className={className}>
      {items.map((child, index) => {
        const isHovered = hovered === index;

        return (
          <div
            key={child.key ?? index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`transition-all duration-300 ease-out will-change-transform ${itemClassName} ${
              isHovered ? "z-10 -translate-y-2 scale-[1.035]" : ""
            }`}
            style={
              isHovered
                ? {
                    // A soft black lift rather than the blue glow this used to
                    // cast, so the card's own photography carries the colour.
                    filter:
                      "drop-shadow(0 18px 30px rgba(0,0,0,0.34)) drop-shadow(0 4px 10px rgba(0,0,0,0.22))",
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
