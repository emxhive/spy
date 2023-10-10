import React, { useRef } from "react";
import { useState } from "react";
import Collapsible from "react-collapsible";
import "../../css/mobtracker.css";
import mthdss from "../../consts/functions";
import { Link } from "react-router-dom";
import { parseActionCodeURL } from "firebase/auth";

export default function Tracker({ trackState, settrackState }) {
  const mth = mthdss();

  let triggerText = "";

  let triggerNo = -1;
  let altTrigNo;
  let prevTrigNo;
  let pasCount = 0;

  const months = setMonthArr();

  const monthsCollapse = [];

  for (const key in trackState) {
    const data = trackState[key];
    const date = new Date(Number(key.replace("t", "")));
    const collaspKey = getCollapsKey(date, triggerNo);

    let pnlClass = "mob-track-pnl-mini-gain";
    let x;
    if (data.prev?.r > 0) {
      x = Number(data.tiu - data.prev.tiu);
      if (x < 0) {
        pnlClass = "mob-track-pnl-mini-loss";
      } else {
        pnlClass = "mob-track-pnl-mini-gain";
      }
    } else {
      x = 0;
    }

    function createEntry() {
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
          <span className={pnlClass}> {mth.tidyFig(x)}</span>
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
          </div>
        </div>
      );
    }

    const result = determineTrigger(date);
    triggerNo = result.b;
    altTrigNo = result.a;

    if (new Date().getMonth() === date.getMonth()) {
      months[0].data[triggerNo]?.push(createEntry());
      months[0].collaspKey[triggerNo] = collaspKey;

      prevTrigNo = triggerNo;
    } else {
      //past tense

      const index = getMonthIndex(date);

      if (index < 7) {
        pasCount++;
        months[index].data.push(createEntry());
        months[index].collaspKey = collaspKey;
      }
    }

    setMonthCollapses({
      date: date,
      months: months,
      monthsCollapse: monthsCollapse,
      altTrigNo: altTrigNo,
    });
  }

  const trackerContent = (
    <div className="mob-trackercontent">
      {pasCount > 0 && <div className="mob-trackrecords-past">{[]}</div>}
      <div className="mob-trackrecords-current">{monthsCollapse[0]}</div>
    </div>
  );
  return trackerContent;
}

function determineTrigger(date) {
  const today = new Date().getDate();
  const dateDay = date.getDate();
  if (dateDay === today) {
    return { a: 0, b: 0 };
  } else {
    const key = Math.floor(date.getDate() / 9);
    switch (key) {
      case 0:
        return { a: 1, b: 4 };
      case 1:
        return { a: 2, b: 3 };
      case 2:
        return { a: 3, b: 2 };
      case 3:
        return { a: 4, b: 1 };
      case 4:
        return { a: 4, b: 1 };
      default:
        return -1;
    }
  }
}

function getCollapsKey(date, trigNo) {
  return `m${date.getMonth()}tn${trigNo}`;
}

function setMonthCollapses({ date, months, monthsCollapse, altTrigNo }) {
  const mth = mthdss();
  for (let i = 0; i < 7; i++) {
    switch (i) {
      //MONTH
      case 0:
        monthsCollapse[0] = [];
        for (let j = 0; j < 5; j++) {
          switch (j) {
            //WEEKS
            case 0:
              monthsCollapse[0][0] = months[0].data[0]?.length > 0 && (
                <Collapsible trigger={"Today"} key={months[0].collaspKey[0]}>
                  {months[0].data[0]}
                </Collapsible>
              );

              break;

            default:
              monthsCollapse[i][j] = months[i].data[j]?.length > 0 && (
                <Collapsible
                  trigger={`WK-${altTrigNo}`}
                  key={months[i].collaspKey[j]}
                >
                  {months[i].data[j]}
                </Collapsible>
              );
              break;
          }
        }
        break;

      default:
        monthsCollapse[i] = months[i].data.length > 0 && (
          <Collapsible
            trigger={mth.getMonthName(date)}
            key={months[i].collaspKey}
          >
            {months[i]}
          </Collapsible>
        );
        break;
    }
  }
}

function setMonthArr() {
  const arr = [];
  for (let x = 0; x < 7; x++) {
    let obj;
    switch (x) {
      case 0:
        obj = {
          data: [[], [], [], [], []],
          collaspKey: [],
        };
        arr[x] = obj;
        break;

      default:
        obj = {
          data: [],
          collaspKey: "",
        };
        arr[x] = obj;

        break;
    }
  }

  return arr;
}

function getMonthIndex(date) {
  const difference = new Date().getMonth() - date.getMonth();
  if (difference > 0) {
    return difference;
  } else {
    return 12 + difference;
  }
}
