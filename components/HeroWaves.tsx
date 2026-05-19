function zigzag(
  centerY: number,
  halfBand: number,
  amplitude: number,
  period: number,
  total: number
): string {
  const step = period / 2;
  const n = Math.ceil(total / step);
  const top: string[] = [];
  const bot: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = Math.min(i * step, total);
    const off = i % 2 === 0 ? -amplitude : amplitude;
    top.push(`${x},${centerY - halfBand + off}`);
    bot.push(`${x},${centerY + halfBand + off}`);
  }
  return `M ${top.join(" L ")} L ${[...bot].reverse().join(" L ")} Z`;
}

const WAVES = [
  { id: 1, period: 600, y: 48, half: 11, amp: 16, fill: "rgba(255,248,240,0.07)" },
  { id: 2, period: 400, y: 66, half:  8, amp: 12, fill: "rgba(255,248,240,0.09)" },
  { id: 3, period: 300, y: 28, half:  7, amp: 10, fill: "rgba(255,248,240,0.06)" },
];

export function HeroWaves() {
  return (
    <>
      {WAVES.map((w) => (
        <svg
          key={w.id}
          className={`wave-layer wave-${w.id}`}
          viewBox="0 0 2400 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={zigzag(w.y, w.half, w.amp, w.period, 2400)} fill={w.fill} />
        </svg>
      ))}
    </>
  );
}
