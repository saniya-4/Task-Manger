import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <main style={styles.content}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#faf8f4",
  },

  content: {
    marginLeft: "260px", // same as sidebar width
    width: "calc(100% - 260px)",
    padding: "30px",
    minHeight: "100vh",
    background: "#faf8f4",
  },
};

export default Layout;