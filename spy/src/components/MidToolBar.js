import mthdss from "../consts/functions";
import React, { useContext, useEffect, useState } from "react";
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
  BsCheck,
} from "react-icons/bs";
import { pmUpdatespyStore } from "../utils/updatespyStore";
import { toast } from "react-toastify";
import {
  SetTrackContext,
  TrackContext,
  HistoryWatch,
  PmState,
} from "../Context";

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

  const savebuttons = (
    <div className="save-buttons">
      <button
        onClick={() => {
          const entrydata = exportentryData();

          if (Object.keys(entrydata).length > 0) {
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
          }

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

  function populatetracker() {
    if (!state.generalProps.isDefaultState) {
      const localTracker = mthds.fromLocalStorage("trackState");
      const historyWatch = mthds.fromLocalStorage("historyWatch");
      const previousData = JSON.parse(localStorage.getItem("previousTrack"));

      const currentId = mthds.getTimeId(new Date());
      const currentObj = {
        r: state.generalProps.rate,
        uf: objs.pmAmount.netUsdF,
        nf: objs.pmAmount.netNgnF,
        u: objs.pmAmount.netUsd - objs.pmAmount.netUsdF,
        n: objs.pmAmount.netNgn - objs.pmAmount.netNgnF,
        iu: objs.pmAmount.netInUsd - objs.pmAmount.netInUsdF,
        in: objs.pmAmount.netInNgn - objs.pmAmount.netInNgnF,
        tiu: objs.pmAmount.netInUsd,
        tin: objs.pmAmount.netInNgn,
        exp: Number(historyWatch),
        prev: previousData,
      };
      let pnl = 0;
      if (currentObj.prev?.r > 0) {
        let y = 0;
        if (currentObj.exp) {
          y = -currentObj.exp;
        }

        pnl = mthds.twodp(currentObj.tiu + y - currentObj.prev.tiu);
        mthds.toLocalStorage("historyWatch", null);
        const monthEarnz = mthds.fromLocalStorage("monthEarnz");
        let monthEarnzResult = monthEarnz;

        if (!monthEarnz) {
          monthEarnzResult = [];

          for (let i = 0; i < 7; i++) {
            if (i == 0) {
              monthEarnzResult[0] = { ids: [], obj: {}, sum: 0 };
            } else {
              monthEarnzResult[i] = [];
            }
          }
          mthds.toLocalStorage("monthEarnz", monthEarnzResult);
        }

        if (pnl !== 0) {
          const month0 = monthEarnzResult[0];
          month0.ids.unshift(currentId);
          month0.obj[currentId] = pnl;
          month0.sum += pnl;
          mthds.toLocalStorage("monthEarnz", monthEarnzResult);
        }
      }
      let localTrack = {};
      Object.assign(localTrack, localTracker);
      toast("New Track Record");
      localTrack[0].obj[currentId] = currentObj;
      localTrack[0].ids.unshift(currentId);

      const prevD = {
        r: currentObj.r,
        tiu: currentObj.tiu,
        tin: currentObj.tin,
      };
      localStorage.setItem("previousTrack", JSON.stringify(prevD));

      localStorage.setItem("trackState", JSON.stringify(localTrack));
    }
  }

  return (
    <div className="toolbar">
      {showsavebuttons && savebuttons}
      <div className="toolbar-left"></div>
      <ToolBar
        isDefault={state.generalProps.isDefaultState + ""}
        trackerFn={populatetracker}
        setaddpmS={setaddpmS}
      />
    </div>
  );
}

const ToolBar = ({ trackerFn, isDefault, setaddpmS }) => {
  const [open, setOpen] = useState(false);

  let className = "toolbar-right";
  return (
    <div className={className + `${open ? "" : "-before"}`}>
      {open ? (
        <>
          <BsPlusCircle onClick={() => setaddpmS(true)} />
          <BsCheck className="mob-toolbar-tic" onClick={() => trackerFn()} />
          <BsChevronDoubleUp />
          <BsChevronUp />
          <CgScrollV />
          <BsChevronDown />
          <BsChevronDoubleDown />
          <BsFilter />
        </>
      ) : (
        ""
      )}
      <span onClick={() => setOpen(!open)}>
        {!open ? <BsChevronLeft /> : <BsChevronRight />}
      </span>
    </div>
  );
};

export default MidToolBar;
