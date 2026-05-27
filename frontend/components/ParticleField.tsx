type Particle = {
  id: number;
  cx: string;
  cy: string;
  r: number;
  opacity: number;
  delay: number;
  duration: number;
};

function seededRandom(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    cx: `${seededRandom(index + 3) * 100}%`,
    cy: `${seededRandom(index + 11) * 100}%`,
    r: 1.2 + seededRandom(index + 19) * 2.5,
    opacity: 0.12 + seededRandom(index + 29) * 0.42,
    delay: -seededRandom(index + 37) * 8,
    duration: 7 + seededRandom(index + 43) * 6,
  }));
}

export default function ParticleField({ count = 25 }: { count?: number }) {
  const particles = createParticles(count);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <g
          key={particle.id}
          style={{
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <circle
            cx={particle.cx}
            cy={particle.cy}
            r={particle.r}
            fill="#5eead4"
            opacity={particle.opacity}
          />
        </g>
      ))}
    </svg>
  );
}
