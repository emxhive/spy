import { Tooltip } from "react-tooltip";

export default function EntryHead({ count }) {
  const values = [
    <div className="div-with-name-and-count">
      {"Name"}
      <div className="pmcount">{count}</div>
    </div>,
    "Balance",
    "Frozen",
    "Spend",
  ];
  return (
    <div className="entry-head">
      <Tooltip
      
        variant="info" content="Usable balance; excluding potential fees and frozen assets"
        id='balance-info'
      />
      {values.map((value) => (
        <div
          data-tooltip-id={value === 'Balance' && 'balance-info'}
          key={value}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
