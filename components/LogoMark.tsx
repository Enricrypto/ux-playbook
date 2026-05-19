export function LogoMark({ className = "", color = "#111111" }: { className?: string; color?: string }) {
  return (
    <span className={`inline-flex items-baseline leading-none ${className}`} style={{ gap: "0.35rem" }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "0.9rem",
          letterSpacing: "-0.01em",
          color,
          lineHeight: 1,
        }}
      >
        UX
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: "-0.02em",
          color,
          lineHeight: 1,
        }}
      >
        Playbook
      </span>
    </span>
  )
}
