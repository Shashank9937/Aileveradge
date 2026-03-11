import type { PropsWithChildren } from "react";

export function Card(props: PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      <header style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>{props.title}</h3>
        {props.subtitle ? (
          <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: 14 }}>{props.subtitle}</p>
        ) : null}
      </header>
      <div>{props.children}</div>
    </section>
  );
}

export function Badge(props: PropsWithChildren<{ tone?: "neutral" | "success" | "warning" | "danger" }>) {
  const toneMap = {
    neutral: { bg: "#f3f4f6", color: "#111827" },
    success: { bg: "#dcfce7", color: "#166534" },
    warning: { bg: "#fef3c7", color: "#92400e" },
    danger: { bg: "#fee2e2", color: "#991b1b" }
  } as const;

  const style = toneMap[props.tone ?? "neutral"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 600,
        background: style.bg,
        color: style.color
      }}
    >
      {props.children}
    </span>
  );
}
