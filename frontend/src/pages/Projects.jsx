import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/projects/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data.projects);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <h3>Loading projects...</h3>;

  return (
    <div>
      <h2>All Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div style={{ display: "grid", gap: "10px" }}>
          {projects.map((p) => (
            <div key={p.id} style={styles.card}>
              <h3>{p.title}</h3>
              <p>{p.description || "No description"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
  },
};

export default Projects;