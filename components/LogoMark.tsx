export function LogoMark({ className = "", color = "#111111" }: { className?: string; color?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        style={{
          fontFamily: "var(--font-logo)",
          fontWeight: 900,
          fontSize: "1.25rem",
          letterSpacing: "-0.04em",
          color,
          lineHeight: 1,
        }}
      >
        UX
      </span>
      <span
        style={{
          fontFamily: "var(--font-logo)",
          fontWeight: 900,
          fontSize: "0.5rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color,
          lineHeight: 1,
          marginTop: "2px",
        }}
      >
        Playbook
      </span>
    </span>
  )
}
