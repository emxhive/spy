import mthdss from "../consts/functions";
import React, { useContext, useState } from "react";
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
import { PendingHiContext, SetTrackContext, TrackContext } from "../Context";

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
  const trackState = useContext(TrackContext);
  const settrackState = useContext(SetTrackContext);
  const pendHiState = useContext(PendingHiContext);

  const mthds = mthdss();
  const previousData = JSON.parse(localStorage.getItem("previousTrack"));

  const showtoolbar = (
    <div className="toolbar-right-before">
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
      <BsCheck className="mob-toolbar-tic" onClick={() => populatetracker()} />
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
    if (!state.generalProps.isDefaultState) {
      const currentId = mthds.getTimeId(new Date());
      let localTrack = {};
      toast("New Track Record");
      localTrack = {
        [currentId]: {
          r: state.generalProps.rate,
          uf: objs.pmAmount.netUsdF,
          nf: objs.pmAmount.netNgnF,
          u: objs.pmAmount.netUsd - objs.pmAmount.netUsdF,
          n: objs.pmAmount.netNgn - objs.pmAmount.netNgnF,
          iu: objs.pmAmount.netInUsd - objs.pmAmount.netInUsdF,
          in: objs.pmAmount.netInNgn - objs.pmAmount.netInNgnF,
          tiu: objs.pmAmount.netInUsd,
          tin: objs.pmAmount.netInNgn,
          get exp() {
            return pendHiState ? Number(pendHiState.amount) : null;
          },
          prev: previousData,
        },
        ...trackState,
      };

      const prevD = {
        r: localTrack[currentId].r,
        tiu: localTrack[currentId].tiu,
        tin: localTrack[currentId].tin,
      };
      localStorage.setItem("previousTrack", JSON.stringify(prevD));
      settrackState(localTrack);
      localStorage.setItem("trackState", JSON.stringify(localTrack));
    }
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
