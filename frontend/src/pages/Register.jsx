import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

/* ─── SAME DESIGN TOKENS ───────────────────────────────────────────── */
const token = {
  ink: "#0f0e0d",
  ink2: "#3a3835",
  ink3: "#7a776f",
  paper: "#faf8f4",
  paper2: "#f2efe9",
  paper3: "#e8e4db",
  rule: "#dedad2",
  amber: "#c8873a",
  amberLt: "#f5e9d8",
  redLt: "#fdecea",
  red: "#c0392b",
  geist: "'Geist', sans-serif",
  serif: "'Instrument Serif', serif",
};

const s = {
  page: {
    minHeight: "100vh",
    background: token.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: token.geist,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: "2.75rem",
  },
  brandMark: {
    width: 36,
    height: 36,
    border: `1.5px solid ${token.rule}`,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: token.ink,
  },
  brandName: {
    fontFamily: token.serif,
    fontSize: 20,
    color: token.ink,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: token.amber,
    marginBottom: 6,
  },
  title: {
    fontFamily: token.serif,
    fontSize: "2rem",
    color: token.ink,
    marginBottom: "1.75rem",
  },
  field: { marginBottom: "1.1rem" },
  label: {
    fontSize: 12,
    color: token.ink2,
    marginBottom: 6,
    display: "block",
  },
  inputWrap: { position: "relative" },
  input: {
    width: "100%",
    height: 44,
    background: token.paper2,
    border: `1.5px solid ${token.rule}`,
    borderRadius: 10,
    fontSize: 14,
    padding: "0 14px 0 40px",
    outline: "none",
  },
  inputIcon: {
    position: "absolute",
    left: 13,
    top: "50%",
    transform: "translateY(-50%)",
    color: token.ink3,
  },
  btn: {
    width: "100%",
    height: 46,
    background: token.ink,
    color: token.paper,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    marginTop: "1.5rem",
  },
  error: {
    background: token.redLt,
    color: token.red,
    borderRadius: 10,
    padding: "0.7rem 1rem",
    marginBottom: "1rem",
  },
  note: {
    background: token.amberLt,
    padding: "0.7rem 1rem",
    marginTop: "1rem",
    borderRadius: 10,
    fontSize: 12,
  },
  link: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: 13,
  },
};

/* ─── ICONS (same as login) ─────────────────────────────────────────── */
const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" style={s.inputIcon}>
    <circle cx="12" cy="7" r="4" />
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
  </svg>
);

const IconLock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" style={s.inputIcon}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

/* ─── COMPONENT ─────────────────────────────────────────────────────── */
function Register() {
  const [f, setF] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const h = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const s_submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser(f);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        <div style={s.brand}>
          <div style={s.brandMark}></div>
          <span style={s.brandName}>TaskFlow</span>
        </div>

        <div style={s.eyebrow}>Create Account</div>
        <div style={s.title}>Join the workspace</div>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={s_submit}>
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <div style={s.inputWrap}>
              <input name="name" style={s.input} onChange={h} />
              <IconUser />
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <input type="password" name="password" style={s.input} onChange={h} />
              <IconLock />
            </div>
          </div>

          <button style={s.btn} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div style={s.note}>
          Your account will require admin approval before login.
        </div>

        <div style={s.link}>
          Already have an account?{" "}
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Login
          </span>
        </div>

      </div>
    </div>
  );
}

export default Register;