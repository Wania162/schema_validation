import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  const styles = {
    success: { bg: "#ECFDF5", border: "#6EE7B7", color: "#065F46", icon: "✓" },
    error:   { bg: "#FEF2F2", border: "#FCA5A5", color: "#991B1B", icon: "✕" },
    info:    { bg: "#EFF6FF", border: "#93C5FD", color: "#1E40AF", icon: "i" },
  };
  const s = styles[type] || styles.info;

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 1000,
      display: "flex", alignItems: "center", gap: 10,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      padding: "12px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500,
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)", animation: "slideUp 0.25s ease",
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: "50%", background: s.border,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0,
      }}>{s.icon}</span>
      {message}
      <button onClick={onClose} style={{
        marginLeft: 8, background: "none", border: "none",
        cursor: "pointer", color: s.color, opacity: 0.6, fontSize: 16, lineHeight: 1,
      }}>×</button>
    </div>
  );
}