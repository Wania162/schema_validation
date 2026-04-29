import { useState } from "react";
import Input from "../components/Input";
import { getAllUsers } from "../api/users";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email) errs.email = "Email daalo";
    if (!form.password) errs.password = "Password daalo";
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      const users = await getAllUsers();
      const user = users.find((u) => u.email === form.email && u.password === form.password);
      if (user) {
        onSuccess(`Welcome back, ${user.name.split(" ")[0]}!`, "success");
        setForm({ email: "", password: "" });
      } else {
        onSuccess("Email ya password galat hai", "error");
      }
    } catch {
      onSuccess("Server se connect nahi ho saka", "error");
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>Welcome back</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>Apne account mein login karo</p>
      </div>
      <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input label="Email Address" type="email" placeholder="sara@gmail.com" value={form.email} onChange={set("email")} error={errors.email} />
        <Input label="Password" type="password" placeholder="Tumhara password" value={form.password} onChange={set("password")} error={errors.password} />
        <button type="submit" disabled={loading} style={{
          marginTop: 8, padding: 12, borderRadius: 10, border: "none",
          background: loading ? "#A5B4FC" : "linear-gradient(135deg, #6366F1, #8B5CF6)",
          color: "#fff", fontSize: 15, fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
        }}>
          {loading ? "Checking..." : "Login →"}
        </button>
      </form>
    </div>
  );
}