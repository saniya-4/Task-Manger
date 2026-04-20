import { useEffect, useState } from "react";
import privateApi from "../services/privateApi";
import { useParams } from "react-router-dom";

function AddMember() {
  const { projectId } = useParams();

  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("member");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await privateApi.get("/api/users/workspace-users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await privateApi.get(
          `/project-members/${projectId}/members`
        );
        setMembers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (projectId) fetchMembers();
  }, [projectId]);

  const handleAdd = async () => {
    if (!userId) return setMsg("Select a user first");

    try {
      setLoading(true);
      setMsg("");

      await privateApi.post("/project-members/add-member", {
        projectId,
        userId,
        role,
      });

      setMsg("Member added successfully ✅");

      const res = await privateApi.get(
        `/project-members/${projectId}/members`
      );
      setMembers(res.data);

      setUserId("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        
        {/* HEADER */}
        <h2 style={styles.title}>Project Members</h2>
        <p style={styles.subText}>Manage team access for this project</p>

        {/* PROJECT ID */}
        <div style={styles.projectBox}>
          Project ID: <b>{projectId}</b>
        </div>

        {/* MEMBERS LIST */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Current Members</h4>

          <div style={styles.memberWrap}>
            {members.length === 0 && (
              <p style={styles.emptyText}>No members yet</p>
            )}

            {members.map((m) => (
              <div key={m.id} style={styles.memberCard}>
                <div>
                  <div style={styles.memberName}>{m.User?.name}</div>
                  <div style={styles.memberRole}>{m.role}</div>
                </div>

                <span
                  style={{
                    ...styles.roleBadge,
                    background:
                      m.role === "manager" ? "#DCFCE7" : "#E0E7FF",
                    color: m.role === "manager" ? "#166534" : "#3730A3",
                  }}
                >
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ADD MEMBER */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Add Member</h4>

          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.input}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>

          <button
            onClick={handleAdd}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Adding..." : "Add Member"}
          </button>

          {msg && <p style={styles.msg}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddMember;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
    background: "#f4f6fb",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },

  card: {
    width: 520,
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 4,
  },

  subText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
  },

  projectBox: {
    background: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
    marginBottom: 20,
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
  },

  memberWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  memberCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #eee",
    background: "#fafafa",
  },

  memberName: {
    fontSize: 14,
    fontWeight: 600,
  },

  memberRole: {
    fontSize: 12,
    color: "#777",
  },

  roleBadge: {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 600,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 13,
    outline: "none",
  },

  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
  },

  msg: {
    marginTop: 10,
    fontSize: 13,
    textAlign: "center",
    color: "#444",
  },

  emptyText: {
    fontSize: 13,
    color: "#888",
  },
};