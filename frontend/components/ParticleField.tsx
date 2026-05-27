'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function ParticleField({ count = 8 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${seededRandom(i * 3) * 100}%`,
      top: `${seededRandom(i * 7) * 100}%`,
      size: 1.5 + seededRandom(i * 11) * 3.5,
      delay: seededRandom(i * 13) * 4,
      duration: 9 + seededRandom(i * 17) * 6,
      opacity: 0.06 + seededRandom(i * 19) * 0.12,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: '#F5F0E8',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0, 0, 1],
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
