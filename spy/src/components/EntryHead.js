export default function EntryHead() {
  const values = ["Name", "Balance", "Frozen", "Spend"];
  return (
    <div className="entry-head">
      {values.map((value) => (
        <div key={value}>{value}</div>
      ))}
    </div>
  );
}
