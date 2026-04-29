import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, updateUser } from "../api/users";
import Input from "../components/Input";

function Avatar({ name }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const colors = ["#6366F1","#8B5CF6","#EC4899","#F59E0B","#10B981","#3B82F6"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: 40, height: 40, borderRadius: "50%",
      background: color + "20", border: `1.5px solid ${color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, color, flexShrink: 0,
    }}>{initials}</div>
  );
}

function DeleteModal({ name, onClose, onConfirm }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 28, width: 380,
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)", textAlign: "center",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "#FEF2F2", border: "1px solid #FEE2E2",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, margin: "0 auto 16px",
        }}>🗑️</div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
          User delete karna hai?
        </h3>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px", lineHeight: 1.6 }}>
          <strong style={{ color: "#111827" }}>{name}</strong> ko permanently delete kar doge — yeh wapas nahi aayega!
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 10, borderRadius: 8,
            border: "1px solid #E5E7EB", background: "#F9FAFB",
            color: "#374151", fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: 10, borderRadius: 8, border: "none",
            background: "linear-gradient(135deg, #EF4444, #DC2626)",
            color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, age: user.age });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setLoading(true);
    try {
      await updateUser(user._id, { ...form, age: Number(form.age) });
      onSave("User update ho gaya!", "success");
    } catch {
      onSave("Update fail hua", "error");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 28, width: 420,
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Edit User</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9CA3AF" }}>×</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Name" value={form.name} onChange={set("name")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Email" value={form.email} onChange={set("email")} />
            <Input label="Age" type="number" value={form.age} onChange={set("age")} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 10, borderRadius: 8,
            border: "1px solid #E5E7EB", background: "#F9FAFB",
            color: "#374151", fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={save} disabled={loading} style={{
            flex: 1, padding: 10, borderRadius: 8, border: "none",
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            color: "#fff", fontSize: 14, fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}>{loading ? "Saving..." : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}

export default function Users({ onSuccess }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      onSuccess("Users load nahi ho sake", "error");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await deleteUser(deleteModal.id);
      onSuccess(`${deleteModal.name} delete ho gaya`, "success");
      setDeleteModal(null);
      load();
    } catch {
      onSuccess("Failed to delete user", "error");
    }
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {editUser && (
        <EditModal user={editUser} onClose={() => setEditUser(null)}
          onSave={(msg, type) => { onSuccess(msg, type); setEditUser(null); load(); }} />
      )}
      {deleteModal && (
        <DeleteModal
          name={deleteModal.name}
          onClose={() => setDeleteModal(null)}
          onConfirm={handleDelete}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>All Users</h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>{users.length} registered users</p>
        </div>
        <button onClick={load} style={{
          padding: "8px 16px", borderRadius: 8, border: "1px solid #E5E7EB",
          background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer",
        }}>↻ Refresh</button>
      </div>

      <input value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8, marginBottom: 16,
          border: "1px solid #E5E7EB", fontSize: 14, background: "#FAFAFA",
          outline: "none", boxSizing: "border-box",
        }} />

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF" }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>👤</div>
          <div style={{ fontSize: 14 }}>Koi user nahi mila</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((u) => (
            <div key={u._id} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "#fff", border: "1px solid #F3F4F6",
              borderRadius: 12, padding: "14px 16px", transition: "box-shadow 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#E0E7FF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#F3F4F6"; }}
            >
              <Avatar name={u.name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{u.name}</div>
                <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{u.email} · Age {u.age}</div>
                <div style={{ fontSize: 11, color: "#D1D5DB", marginTop: 2, fontFamily: "monospace" }}>{u._id}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => setEditUser(u)} style={{
                  padding: "6px 14px", borderRadius: 7,
                  border: "1px solid #E0E7FF", background: "#EEF2FF",
                  color: "#4338CA", fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>Edit</button>
                <button onClick={() => setDeleteModal({ id: u._id, name: u.name })} style={{
                  padding: "6px 14px", borderRadius: 7,
                  border: "1px solid #FEE2E2", background: "#FEF2F2",
                  color: "#DC2626", fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}