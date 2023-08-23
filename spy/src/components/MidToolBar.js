import mthdss from "../consts/functions";
import React, { useState } from "react";
import { CgScrollV } from "react-icons/cg";
import {
  BsPlusCircle,
  BsChevronUp,
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleUp,
  BsChevronDown,
  BsChevronDoubleDown,
  BsFilter,
} from "react-icons/bs";
import { pmUpdatespyStore } from "../utils/updatespyStore";

function MidToolBar({
  setEdit,
  edit,
  state,
  objs,
  exportentryData,
  setState,
  setaddpmS,
  setshowbuttons,

  showsavebuttons,
  setCurrentEntry,
  currentEntry,
}) {
  const mthds = mthdss();

  const showtoolbar = (
    <div>
      <BsChevronLeft onClick={open} />
    </div>
  );

  const savebuttons = (
    <div className="save-buttons">
      <button
        onClick={() => {
          const entrydata = exportentryData();
          const pm = currentEntry;
          setEdit({ ...edit, [currentEntry]: true });
          setshowbuttons(false);

          setState({
            ...state,
            [pm]: {
              ...state[pm],
              ...entrydata,
            },
          });

          let json = "{";
          for (const [key, value] of Object.entries(entrydata)) {
            json += '"' + pm + "." + key + '" :' + value + ",";
          }
          json = json.slice(0, json.length - 1) + "}";

          pmUpdatespyStore({
            dataUpdate: JSON.parse(json),
            spyCollection: "pmstate",
          });

          setCurrentEntry(null);
        }}
      >
        save
      </button>
      <button
        onClick={() => {
          setshowbuttons(false);
          setEdit({ ...edit, [currentEntry]: true });
          setCurrentEntry(null);
        }}
      >
        save+
      </button>
    </div>
  );
  const toolbar = (
    <div className="toolbar-right">
      <BsPlusCircle onClick={() => setaddpmS(true)} />
      <BsChevronDoubleUp />
      <BsChevronUp />
      <CgScrollV />
      <BsChevronDown />
      <BsChevronDoubleDown />
      <BsFilter />
      <BsChevronRight onClick={close} />
    </div>
  );
  const [toolRight, setToolRight] = useState(showtoolbar);
  function open() {
    setToolRight(toolbar);
  }
  function close() {
    setToolRight(showtoolbar);
  }

  return (
    <div className="toolbar">
      {showsavebuttons && savebuttons}
      <div className="toolbar-left"></div>
      {toolRight}
    </div>
  );
}

export default MidToolBar;
