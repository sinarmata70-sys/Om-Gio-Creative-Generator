import React, { useEffect, useState } from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const ClickFeedback: React.FC = () => {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Don't trigger on right-clicks
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      // Color scheme matching the cyan-indigo-purple cybernetic theme
      const colors = [
        'rgba(99, 102, 241, 0.75)', // indigo
        'rgba(168, 85, 247, 0.75)', // purple
        'rgba(56, 189, 248, 0.75)', // cyan/sky
        'rgba(245, 158, 11, 0.75)', // amber
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: randomColor,
      };

      setRipples((prev) => [...prev.slice(-8), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Click ripple pulse at the exact target position pressed */}
      {ripples.map((ripple) => (
        <React.Fragment key={ripple.id}>
          {/* Main expanding ripple ring */}
          <span
            className="absolute rounded-full animate-ping-once"
            style={{
              left: ripple.x - 18,
              top: ripple.y - 18,
              width: 36,
              height: 36,
              borderColor: ripple.color,
              borderWidth: '2px',
              borderStyle: 'solid',
              boxShadow: `0 0 16px 2px ${ripple.color}, inset 0 0 8px 1px ${ripple.color}`,
            }}
          />
          {/* Center glow spark dot */}
          <span
            className="absolute rounded-full animate-click-spark"
            style={{
              left: ripple.x - 4,
              top: ripple.y - 4,
              width: 8,
              height: 8,
              backgroundColor: ripple.color,
              boxShadow: `0 0 10px 4px ${ripple.color}`,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
