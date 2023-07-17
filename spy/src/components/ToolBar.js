import mthdss from "../consts/functions";
import React, { useState } from "react";
import { CgScrollV } from "react-icons/cg";
import {
  BsChevronUp,
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleUp,
  BsChevronDown,
  BsChevronDoubleDown,
  BsFilter
} from "react-icons/bs";

function ToolBar({ state, objs }) {
  const mthds = mthdss();
  const button = (
    <div>
      <BsChevronLeft onClick={open} />
    </div>
  );
  const toolbar = (
    <div className="toolbar-right">
      <BsChevronDoubleUp />
      <BsChevronUp />
      <CgScrollV />
      <BsChevronDown />
      <BsChevronDoubleDown />
      <BsFilter />
      <BsChevronRight onClick={close} />
    </div>
  );
  const [toolRight, setToolRight] = useState(button);
  function open() {
    setToolRight(toolbar);
  }
  function close() {
    setToolRight(button);
  }

  return (
    <div className="toolbar">
      <div className="toolbar-left"></div>
      {toolRight}
    </div>
  );
}

export default ToolBar;
