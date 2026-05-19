function zigzag(cy: number, hb: number, amp: number, period: number, total: number): string {
  const step = period / 2
  const n = Math.ceil(total / step)
  const top: string[] = []
  const bot: string[] = []
  for (let i = 0; i <= n; i++) {
    const x = Math.min(i * step, total)
    const off = i % 2 === 0 ? -amp : amp
    top.push(`${x},${cy - hb + off}`)
    bot.push(`${x},${cy + hb + off}`)
  }
  return `M ${top.join(" L ")} L ${[...bot].reverse().join(" L ")} Z`
}

const waves = [
  { d: zigzag(22, 10, 14, 320, 800), fill: "rgba(217,92,58,0.14)" },
  { d: zigzag(55, 8,  10, 200, 800), fill: "rgba(184,122,212,0.12)" },
  { d: zigzag(38, 6,   8, 480, 800), fill: "rgba(217,92,58,0.07)" },
]

export function CardWaves() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
    >
      {waves.map((w, i) => (
        <path key={i} d={w.d} fill={w.fill} />
      ))}
    </svg>
  )
}
