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
  BsCheck
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
  trackState,
  settrackState,
  showsavebuttons,
  setCurrentEntry,
  currentEntry
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
              ...entrydata
            }
          });

          let json = "{";
          for (const [key, value] of Object.entries(entrydata)) {
            json += '"' + pm + "." + key + '" :' + value + ",";
          }
          json = json.slice(0, json.length - 1) + "}";

          pmUpdatespyStore({
            dataUpdate: JSON.parse(json),
            spyCollection: "pmstate"
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
      <BsCheck onClick={() => populatetracker()} />
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
  function populatetracker() {
    settrackState({
      [mthds.getTimeId(new Date())]: {
        r: state.generalProps.rate,
        uf: objs.pmAmount.netUsdF,
        nf: objs.pmAmount.netNgnF,
        u: objs.pmAmount.netUsd - objs.pmAmount.netUsdF,
        n: objs.pmAmount.netNgn - objs.pmAmount.netNgnF,
        iu: objs.pmAmount.netInUsd - objs.pmAmount.netInUsdF,
        in: objs.pmAmount.netInNgn - objs.pmAmount.netInNgnF
      },
      ...trackState
    });
    localStorage.setItem(JSON.stringify(trackState));
  }
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
