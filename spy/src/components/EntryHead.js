import { Tooltip } from "react-tooltip";

export default function EntryHead({ count }) {
  const values = [
    <div
      key={"div-with-name-and-count" + new Date().getTime()}
      className="div-with-name-and-count"
    >
      {"Name"}
      <div key="count" className="pmcount">
        {count}
      </div>
    </div>,
    "Balance",
    "Frozen",
    "Spend",
  ];
  return (
    <div className="entry-head">
      <Tooltip
        variant="info"
        content="Usable balance; excluding potential fees and frozen assets"
        id="balance-info"
      />
      {values.map((value) => (
        <div
          data-tooltip-id={value === "Balance" && "balance-info"}
          key={value + new Date().getTime()}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
