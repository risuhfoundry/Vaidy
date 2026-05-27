const orbs = [
  {
    className:
      "left-[4%] top-[12%] h-[22rem] w-[22rem] bg-emerald-400/14 blur-[130px]",
    duration: 10,
    delay: -2,
  },
  {
    className:
      "right-[6%] top-[18%] h-[26rem] w-[26rem] bg-teal-300/12 blur-[150px]",
    duration: 12,
    delay: -4,
  },
  {
    className:
      "bottom-[8%] left-[22%] h-[20rem] w-[20rem] bg-indigo-400/12 blur-[140px]",
    duration: 9,
    delay: -1,
  },
  {
    className:
      "bottom-[-8%] right-[22%] h-[24rem] w-[24rem] bg-emerald-400/10 blur-[150px]",
    duration: 11,
    delay: -5,
  },
];

export default function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb) => (
        <div
          key={orb.className}
          className={`absolute rounded-full ${orb.className}`}
          style={{
            animation: `float ${orb.duration}s ease-in-out ${orb.delay}s infinite, wave ${orb.duration + 5}s ease-in-out ${orb.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
