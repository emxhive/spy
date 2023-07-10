export default function EntryHead() {
  const values = ["Name", "Balance", "Frozen", "Spend"];
  return (
    <div className="entry-head">
      {values.map((value) => (
        <div>{value}</div>
      ))}
    </div>
  );
}
