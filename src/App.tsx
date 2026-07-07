import StatCard from "./components/ui/StatCard";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        padding: "50px",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "40px",
        }}
      >
        🌿 BerryMaster Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <StatCard title="Characters" value="12" />
        <StatCard title="Leppas Growing" value="1872" />
        <StatCard title="Today's Profit" value="¥1,250,000" />
        <StatCard title="Harvest Ready" value="4" />
      </div>
    </div>
  );
}

export default App;