export default function BirthdayBanner() {
  const today = new Date();
  const isBirthday = today.getMonth() === 3 && today.getDate() === 2;

  if (!isBirthday) {
    return null;
  }

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #14532d 0%, #1d4ed8 50%, #7c2d12 100%)",
        color: "#f8fafc",
        padding: "12px 16px",
        textAlign: "center",
        fontWeight: 700,
        letterSpacing: "0.02em",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
      aria-label="Birthday celebration banner"
    >
      Happy Birthday from Sanders Viopro Labs LLC. Keep People Alive. Keep Building.
    </div>
  );
}
