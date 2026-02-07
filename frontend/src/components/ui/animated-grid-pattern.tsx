"use client";

import React, { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export default function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width) || 0,
      Math.floor((Math.random() * dimensions.height) / height) || 0,
    ];
  }

  function generateSquares(count: number) {
    return Array.from({ length: count }, (_, i) => ({ id: i, pos: getPos() }));
  }

  const [squares, setSquares] = useState(() => generateSquares(numSquares));

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions, numSquares]);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    if (containerRef.current) ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, []);

  const updateSquarePosition = (id: number) => {
    setSquares((cur) => cur.map((sq) => (sq.id === id ? { ...sq, pos: getPos() } : sq)));
  };

  const svgClass = `animated-grid ${className || ''}`.trim();

  return (
    <svg
      ref={containerRef}
      aria-hidden
      className={svgClass}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', color: 'rgba(255,255,255,0.06)' }}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} stroke="currentColor" strokeWidth={1} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />

      <svg x={x} y={y} style={{ overflow: 'visible' }}>
        {squares.map(({ pos: [sx, sy], id: sid }, index) => (
          <motion.rect
            key={`${sx}-${sy}-${index}-${sid}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{ duration, repeat: 1, delay: index * 0.06, repeatType: 'reverse' }}
            onAnimationComplete={() => updateSquarePosition(sid)}
            width={Math.max(1, width - 1)}
            height={Math.max(1, height - 1)}
            x={sx * width + 1}
            y={sy * height + 1}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </svg>
    </svg>
  );
}
