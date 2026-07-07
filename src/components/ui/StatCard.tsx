type StatCardProps = {
  title: string;
  value: string | number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div
      style={{
        background: "#1F2937",
        borderRadius: "16px",
        padding: "20px",
        width: "220px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3
        style={{
          color: "#9CA3AF",
          fontSize: "1rem",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "10px",
          color: "#22C55E",
          fontSize: "2rem",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;