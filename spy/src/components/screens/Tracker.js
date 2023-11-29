import React, { useContext, useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import mthdss from "../../consts/functions";
import "../../css/mobtracker.css";
import {
  PendingHiContext,
  SetPendingHiContext,
  TrackContext,
  TrackWatch,
} from "../../Context";
import fetchspyStore from "../../utils/fetchspyStore";
import updatespyStore from "../../utils/updatespyStore";

export default function Tracker({}) {
  const trackState = useContext(TrackContext);
  const pendHiState = useContext(PendingHiContext);
  const setPendingHiState = useContext(SetPendingHiContext);
  const trackWatch = useContext(TrackWatch);

  const currentMonthArr = generateCurrentMonth(trackState);

  const collapsibles = getCollapsibles({
    arr: currentMonthArr,
    track: trackState,
  });

  let data;
  let key;
  let date;

  function setdkd(dat, ki, dait) {
    data = dat;
    key = ki;
    date = dait;
  }

  function createEntry() {
    setpnl(data);
    return (
      <div key={key}>
        {date.toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
        })}{" "}
        {" • "}
        {date
          .toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace("AM", "")
          .replace("PM", "")}
        <span className={pnlClass}> {mth.tidyFig(pnl)}</span>
        <div className="mob-track-entry-box">
          <div>fx</div>
          <div>{data.r}</div>

          <div>u</div>
          <div>{mth.tidyFig(data.u)}</div>
          <div>n</div>
          <div>{mth.tidyFig(data.n)}</div>
          <div>iu</div>
          <div>{mth.tidyFig(data.iu)}</div>
          <div>in</div>
          <div>{mth.tidyFig(data.in)}</div>
          {(() => data.exp < 0 || data.exp > 0)() && [
            <div key={"ex.label"}>ex</div>,
            <div key={"ex.value"}>{mth.tidyFig(data.exp)}</div>,
          ]}
        </div>
      </div>
    );
  }
  function getCollapsibles(arr) {
    if (arr) {
      const resultObj = {
        past: [],
        current: [],
      };

      for (let i = 0; i < 7; i++) {
        switch (i) {
          case 0:
            let obj0;

            for (let j = 0; j < 5; j++) {
              switch (j) {
                case 0:
                  obj0 = arr[j];
                  resultObj.current[0] = obj0?.keys?.length > 0 && (
                    <Collapsible trigger={"Today"} key={"m0w0"}>
                      {obj0.keys.forEach((key) => {
                        setdkd(obj0.obj[key], key, mth.idtoDate(key));
                        return createEntry();
                      })}
                    </Collapsible>
                  );
                  break;

                default:
                  obj0 = arr[j];
                  resultObj.current[j] = obj0?.keys?.length > 0 && (
                    <Collapsible trigger={`WK ${5 - j}`} key={`m0w${j}`}>
                      {obj0.keys.forEach((key) => {
                        setdkd(obj0.obj[key], key, mth.idtoDate(key));
                        return createEntry();
                      })}
                    </Collapsible>
                  );
                  break;
              }
            }
            break;

          default:
            break;
        }
      }

      return resultObj;
    }
  }

  const trackerContent = (
    <div className="mob-trackercontent">
      {<div className="mob-trackrecords-past">{collapsibles.past}</div>}
      <div className="mob-trackrecords-current">{collapsibles.current}</div>
    </div>
  );
  return trackerContent;
}
const mth = mthdss();
let pastContent;
let currentContent;
let pnlClass = "mob-track-pnl-mini-gain";
let pnl;

function generateCurrentMonth(trackState) {
  if (trackState) {
    const resultArr = [];
    for (let i = 0; i < 5; i++) {
      resultArr[i] = { obj: {}, keys: [] };
    }

    const objs = trackState[0].arr;
    const ids = trackState[0].ids;

    ids.forEach((key) => {
      const date = mth.idtoDate(key);
      const day = date.getDate();
      if (day === new Date().getDate()) {
        resultArr[0].obj[key] = objs[key];
        resultArr[0].keys.push(key);
      } else {
        const sKey = day / 8;
        if (sKey > 3) {
          resultArr[sKey].obj[key] = objs[key];
          resultArr[sKey].keys.push(key);
        } else {
          resultArr[sKey + 1].obj[key] = objs[key];
          resultArr[sKey + 1].keys.push(key);
        }
      }
    });
    return resultArr;
  }
}

function setpnl(data, setPendingHiState) {
  if (data.prev?.r > 0) {
    let y = 0;
    if (data.exp) {
      y = -data.exp;
    }
    pnl = data.tiu + y - data.prev.tiu;
    localStorage.setItem("pendingHistEntry", "null");
    setPendingHiState(null);

    //TODO useStorage here send this to firebase when the time comes
    if (pnl < 0) {
      pnlClass = "mob-track-pnl-mini-loss";
    } else {
      pnlClass = "mob-track-pnl-mini-gain";
    }
  } else {
    pnl = 0;
  }
}
