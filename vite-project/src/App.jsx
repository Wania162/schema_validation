import { useState, useCallback } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Toast from "./components/Toast";

const NAV = [
  { id: "signup", label: "Signup", icon: "✦" },
  { id: "login",  label: "Login",  icon: "→" },
  { id: "users",  label: "Users",  icon: "◈" },
];

export default function App() {
  const [active, setActive] = useState("signup");
  const [toast, setToast] = useState({ message: "", type: "info" });

  const notify = useCallback((message, type = "info") => {
    setToast({ message, type });
  }, []);

  const clearToast = useCallback(() => {
    setToast({ message: "", type: "info" });
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F0F4FF 0%, #FAF5FF 50%, #FFF1F5 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .main-card {
          width: 100%;
          max-width: 880px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 24px 80px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.06);
          overflow: hidden;
          display: flex;
          min-height: 540px;
          animation: fadeIn 0.4s ease;
        }

        .sidebar {
          width: 230px;
          flex-shrink: 0;
          background: linear-gradient(180deg, #4F46E5 0%, #7C3AED 100%);
          padding: 28px 16px;
          display: flex;
          flex-direction: column;
        }

        .bottom-nav {
          display: none;
        }

        .main-content {
          flex: 1;
          padding: 36px 40px;
          overflow-y: auto;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .main-card {
            flex-direction: column;
            min-height: unset;
            border-radius: 16px;
          }
          .sidebar {
            width: 100%;
            padding: 20px 16px 12px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .sidebar-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 0 !important; }
          .sidebar-nav { display: none !important; }
          .sidebar-footer { display: none !important; }
          .bottom-nav {
            display: flex;
            background: linear-gradient(90deg, #4F46E5, #7C3AED);
            padding: 8px 12px;
            gap: 4px;
          }
          .main-content {
            padding: 24px 20px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          body { background: linear-gradient(135deg, #F0F4FF, #FAF5FF, #FFF1F5); }
          .main-card {
            border-radius: 12px;
            margin-bottom: 0;
          }
          .main-content {
            padding: 20px 16px;
          }
          .bottom-nav {
            padding: 6px 8px;
          }
        }

        .nav-btn-side {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 10px;
          border: none; cursor: pointer; width: 100%; text-align: left;
          font-size: 14px; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .nav-btn-bottom {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px;
          padding: 8px 4px; border-radius: 10px;
          border: none; cursor: pointer;
          font-size: 11px; font-weight: 500;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div className="main-card">

        {/* Sidebar — Desktop */}
        <div className="sidebar">
          <div className="sidebar-brand" style={{ marginBottom: 36, paddingLeft: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, marginBottom: 0, flexShrink: 0,
            }}>⬡</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>UserHub</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>MongoDB + Express</div>
            </div>
          </div>

          <nav className="sidebar-nav" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => setActive(item.id)}
                  className="nav-btn-side"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                    fontWeight: isActive ? 600 : 400,
                  }}>
                  <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
                  {item.label}
                  {isActive && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer" style={{ marginTop: "auto", paddingLeft: 8 }}>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Server</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "monospace" }}>localhost:3000</div>
            </div>
          </div>
        </div>

        {/* Bottom Nav — Tablet & Mobile */}
        <div className="bottom-nav">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)}
                className="nav-btn-bottom"
                style={{
                  background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div style={{ animation: "fadeIn 0.3s ease" }} key={active}>
            {active === "signup" && <Signup onSuccess={notify} />}
            {active === "login"  && <Login  onSuccess={notify} />}
            {active === "users"  && <Users  onSuccess={notify} />}
          </div>
        </div>

      </div>

      <Toast message={toast.message} type={toast.type} onClose={clearToast} />
    </div>
  );
}