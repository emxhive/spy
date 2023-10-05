import React, { useRef } from "react";
import { useState } from "react";
import Collapsible from "react-collapsible";
import "../../css/mobtracker.css";
import mthdss from "../../consts/functions"
import { Link } from "react-router-dom";

export default function Tracker({ trackState, settrackState }) {



  const mth = mthdss();
  let pastCollapsibles = [];
  let currentCollapsibles = [];

  let pastData = [];
  let currentData = [];

  let hasZero = false;
  let hasOne = false;
  let hasTwo = false;
  let hasThree = false;
  let hasFour = false;

  let triggerText = "";

  function resetValues() {
    hasOne = false;
    hasFour = false;
    hasThree = false;
    hasTwo = false;
    hasZero = false;
  }

  let triggerNo = -1;

  for (const key in trackState) {

    const data = trackState[key];
    const date = new Date(Number(key.replace("t", "")));


    let currentTriggerNo = determineTrigger(date);

    const collaspKey = getCollapsKey(date, currentTriggerNo);

    if (new Date().getMonth() === date.getMonth()) {


      if (triggerNo !== currentTriggerNo) {
        resetValues();
        triggerNo = currentTriggerNo;
        if (triggerNo > -1) {


          switch (triggerNo) {
            //for creating the Collapsible thingy
            case 0: if (!hasZero) {
              triggerText = "Today";
              hasZero = true;
            } break;
            case 1: if (!hasOne) {
              triggerText = "WK-1 ";
              hasOne = true;
            } break;
            case 2: if (!hasTwo) {
              triggerText = "wk-2";
              hasTwo = true;

            } break;
            case 3: if (!hasThree) {
              triggerText = "wk-3";
              hasThree = true;
            } break;

            case 4: if (!hasFour) {
              triggerText = "wk-4";
              hasFour = true;

            } break;
            default: throw new Error("WTF!");
          }
          currentData = [];
          const collapsibleArr = [(<Collapsible trigger={triggerText} key={collaspKey}> {currentData}</Collapsible>)];
          currentCollapsibles.push(collapsibleArr);

        }
      }

      let pnlClass;
      let x;
      if (data.prev?.r > 0) {
        x = Number(data.tiu - data.prev.tiu);
        if (x < 0) {
          pnlClass = "mob-track-pnl-mini-loss";
        } else {
          pnlClass = "mob-track-pnl-mini-gain";
        }
      } else {
        x = 0
      }

      currentData.push(
        <div key={key}>
          {date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })} {" • "}
          {date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })
            .replace("AM", "").replace(("PM"), "")}
          <span className={pnlClass}> {mth.tidyFig(x)}
          </span>
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
            {/* <div>fx</div>
            <div>{mth.tidyFig(data.uf)}</div>
            <div>fx</div>
            <div>{mth.tidyFig(data.nf)}</div> */}
          </div>
        </ div>

      );


    } else {
      //past tense 
    }


  }

  const trackerContent = (
    <div className="mob-trackercontent">
      <div className="mob-trackrecords-past">

        {pastCollapsibles}
      </div>
      <div className="mob-trackrecords-current">

        {currentCollapsibles}
      </div>
    </div>
  );
  return trackerContent;
}


function determineTrigger(date) {
  const today = new Date().getDay();
  if (date.getDay() === today) {
    return 0;
  } else {
    switch (Math.floor(today / 7)) {
      case 0: return 1;
      case 1: return 2;
      case 2: return 3;
      case 3: return 4;
      case 4: return 4;
      default: return -1;
    }
  }
}

function getCollapsKey(date, trigNo) {
  return `m${date.getMonth()}tn${trigNo}`

}