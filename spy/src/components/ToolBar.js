import mthdss from "../consts/functions";
import { CgScrollV } from "react-icons/cg";
import {
  BsChevronUp,
  BsChevronDoubleUp,
  BsChevronDown,
  BsChevronDoubleDown,
  BsFilter,
} from "react-icons/bs";

function ToolBar({ state, objs }) {
  const mthds = mthdss();

  return (
    <div className="toolbar">
      <div className="toolbar-left"></div>
      <div className="toolbar-right">
        <BsChevronDoubleUp />
        <BsChevronUp />
        <CgScrollV />
        <BsChevronDown />
        <BsChevronDoubleDown />
        <BsFilter />
      </div>
    </div>
  );
}

export default ToolBar;
