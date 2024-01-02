import React, { useContext, useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import mthdss from "../../consts/functions";
import "../../css/mobtracker.css";

import fetchspyStore from "../../utils/fetchspyStore";
import updatespyStore from "../../utils/updatespyStore";

export default function Tracker({}) {
  const localTracker = mth.fromLocalStorage("trackState");
  const localEarnz = mth.fromLocalStorage("monthEarnz");

  let data;
  let key;
  let date;

  const currentMonthTrackArr = generateCurrentMonthTrack(localTracker);
  const currentMonthEarnsArr = generateCurrentMonthEarns(localEarnz);

  const collapsibles = getCollapsibles(
    currentMonthTrackArr,
    currentMonthEarnsArr
  );

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
  function getCollapsibles(arr, arrEarnz) {
    if (arr) {
      const resultObj = {
        past: [],
        current: [],
      };

      for (let i = 0; i < 7; i++) {
        switch (i) {
          case 0:
            let obj0;
            let earnz0 = 0;

            for (let j = 0; j < 5; j++) {
              switch (j) {
                case 0:
                  obj0 = arr[j];
                  if (arrEarnz?.[0] !== 0 && arrEarnz) {
                    earnz0 = arrEarnz[0];
                  }

                  resultObj.current[0] = obj0?.keys?.length > 0 && (
                    <Collapsible
                      trigger={[
                        "Today     ",
                        createEarnzSpanContainer(Math.trunc(earnz0)),
                      ]}
                      key={"m0w0"}
                    >
                      {obj0.keys.map((key) => {
                        setdkd(obj0.obj[key], key, mth.idtoDate(key));
                        return createEntry();
                      })}
                    </Collapsible>
                  );
                  break;

                default:
                  obj0 = arr[5-j];
                  if (arrEarnz?.[5-j] !== 0 && arrEarnz) {
                    earnz0 = arrEarnz[5-j];
                  }
                  resultObj.current[j] = obj0?.keys?.length > 0 && (
                    <Collapsible
                      trigger={[
                        ` WK ${5-j}     `,
                        createEarnzSpanContainer(Math.trunc(earnz0)),
                      ]}
                      key={`m0w${5-j}`}
                    >
                      {obj0.keys?.map((key) => {
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
            let keyvar = 0;

            const obj = localTracker[i];
            const earnz = localEarnz?.[i];

            resultObj.past[i] = obj?.ids?.length > 0 && (
              <Collapsible
                trigger={[
                  ` ${monthFromIndex(i)}      `,
                  createEarnzSpanContainer(Math.trunc(earnz)),
                ]}
                key={`m${i}w${++keyvar}`}
              >
                {obj.ids?.map((key) => {
                  setdkd(obj.obj[key], key, mth.idtoDate(key));
                  return createEntry();
                })}
              </Collapsible>
            );
            break;
        }
      }

      return resultObj;
    }
  }

  const trackerContent = (
    <div className="mob-trackercontent">
      {<div className="mob-trackrecords-past">{collapsibles?.past}</div>}
      <div className="mob-trackrecords-current">{collapsibles?.current}</div>
    </div>
  );
  return trackerContent;
}
const mth = mthdss();
let pastContent;
let currentContent;
let pnlClass = "mob-track-pnl-mini-gain";
let pnl;
let current;

function generateCurrentMonthTrack(localTracker) {
  if (localTracker) {
    const resultArr = [];
    for (let i = 0; i < 5; i++) {
      resultArr[i] = { obj: {}, keys: [] };
    }

    const objs = localTracker[0].obj;
    const ids = localTracker[0].ids;

    ids.forEach((key) => {
      const date = mth.idtoDate(key);
      const day = date.getDate();
      if (day === new Date().getDate()) {
        resultArr[0].obj[key] = objs[key];
        resultArr[0].keys.push(key);
      } else {
        const sKey = Math.trunc(day / 8);
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

function generateCurrentMonthEarns(localEarnz) {
  if (localEarnz) {
    const resultArr = [];
    for (let i = 0; i < 5; i++) {
      resultArr[i] = 0;
    }

    const objs = localEarnz[0].obj;
    const ids = localEarnz[0].ids;

    ids.forEach((key) => {
      const date = mth.idtoDate(key);
      const day = date.getDate();
      if (day === new Date().getDate()) {
        resultArr[0] += Number(objs[key]);
      } else {
        const sKey = Math.trunc(day / 8);
        if (sKey > 3) {
          resultArr[sKey] += Number(objs[key]);
        } else {
          resultArr[sKey + 1] += Number(objs[key]);
        }
      }
    });
    return resultArr;
  }
}

function setpnl(data) {
  if (data.prev?.r > 0) {
    let y = 0;
    if (data.exp) {
      y = -data.exp;
    }

    pnl = Math.trunc(data.tiu + y - data.prev.tiu);

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

/**
 *
 * @param {*Number Takes a number ..for example month in question is "i" month away from current month..} int i
 * @returns {*String returns a string of the resulting month "December", ..etc}
 *
 *if i=0 , month in question is current month
 */
function monthFromIndex(i) {
  const monthsArr = require("moment").months();
  let diff = new Date().getMonth() - i;
  if (diff < 0) {
    diff += 12;
  }
  return monthsArr[diff];
}

function createEarnzSpanContainer(value) {
  let classId = "mob-track-pnl-mini-gain";
  if (value < 0) {
    classId = "mob-track-pnl-mini-loss";
  }

  return (
    <span key={new Date().getTime()} className={classId}>
      {value}
    </span>
  );
}
