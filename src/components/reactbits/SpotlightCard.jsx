import { useState } from "react";
import { cn } from "../../lib/utils";

export default function SpotlightCard({ as: Component = "div", className, children, ...props }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <Component
      className={cn(
        "group relative overflow-hidden rounded-lg border border-white/10 bg-black/55 shadow-2xl backdrop-blur-xl",
        className
      )}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255, 255, 255, 0.16), transparent 34%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
