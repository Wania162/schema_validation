export default function Input({ label, error, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{label}</label>
      )}
      <input
        {...props}
        style={{
          padding: "10px 14px", borderRadius: 8, width: "100%",
          border: `1px solid ${error ? "#FCA5A5" : "#E5E7EB"}`,
          fontSize: 14, color: "#111827", outline: "none",
          background: "#FAFAFA", transition: "border 0.15s, box-shadow 0.15s",
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error ? "#EF4444" : "#6366F1";
          e.target.style.boxShadow = error ? "0 0 0 3px rgba(239,68,68,0.1)" : "0 0 0 3px rgba(99,102,241,0.1)";
          e.target.style.background = "#fff";
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "#FCA5A5" : "#E5E7EB";
          e.target.style.boxShadow = "none";
          e.target.style.background = "#FAFAFA";
          props.onBlur && props.onBlur(e);
        }}
      />
      {error && <span style={{ fontSize: 12, color: "#EF4444" }}>{error}</span>}
    </div>
  );
}