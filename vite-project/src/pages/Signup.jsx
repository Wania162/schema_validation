import { useState } from "react";
import Input from "../components/Input";
import { createUser } from "../api/users";

export default function Signup({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.length < 3) e.name = "Name kam az kam 3 characters ka hona chahiye";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email daalo";
    if (!form.password || form.password.length < 6) e.password = "Password kam az kam 6 characters";
    if (!form.age || form.age < 18 || form.age > 100) e.age = "Age 18 se 100 ke beech honi chahiye";
    return e;
  };

  const handle = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      const data = await createUser({ ...form, age: Number(form.age) });
      if (data.error) throw new Error(data.error);
      onSuccess("Account ban gaya! Welcome " + form.name.split(" ")[0], "success");
      setForm({ name: "", email: "", password: "", age: "" });
      setErrors({});
    } catch (err) {
      onSuccess(err.message, "error");
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
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>Create account</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>Apni details fill karo aur signup karo</p>
      </div>
      <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Full Name" placeholder="Sara Khan" value={form.name} onChange={set("name")} error={errors.name} />
          <Input label="Age" type="number" placeholder="22" value={form.age} onChange={set("age")} error={errors.age} />
        </div>
        <Input label="Email Address" type="email" placeholder="sara@gmail.com" value={form.email} onChange={set("email")} error={errors.email} />
        <Input label="Password" type="password" placeholder="Minimum 6 characters" value={form.password} onChange={set("password")} error={errors.password} />
        <button type="submit" disabled={loading} style={{
          marginTop: 8, padding: 12, borderRadius: 10, border: "none",
          background: loading ? "#A5B4FC" : "linear-gradient(135deg, #6366F1, #8B5CF6)",
          color: "#fff", fontSize: 15, fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
        }}>
          {loading ? "Creating..." : "Create Account →"}
        </button>
      </form>
    </div>
  );
}