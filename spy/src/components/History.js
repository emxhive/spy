import React, { useState } from "react";

import ContentPaste from "@mui/icons-material/ContentPaste";
import { Input, InputAdornment } from "@mui/material/";

import "../css/history.css";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaLock,
  FaQuestion
} from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

import mthdss from "../consts/functions";

let historyState;
let pmObj;

//local methods

const mth = mthdss();

export default function History({ pmObjs }) {
  const [isDialog, setDialog] = useState(false);
  const stateObj = {
    daysArr: [],
    dayArr: [],
    toolbarArr: [<IoIosAddCircleOutline onClick={openDialogue} />],
    floatSize: { width: "80%", height: "30%" }
  };
  function openDialogue() {
    if (!isDialog) {
      setDialog(true);
    }
  }

  const [firstState, setFirstState] = useState(stateObj);
  historyState = firstState;
  pmObj = pmObjs;

  return (
    <div className="history-container">
      {isDialog && (
        <div
          onClick={() => {
            setDialog(false);
          }}
          className="form-bg"
        ></div>
      )}
      <div className="history">
        {isDialog && floatingForm()}
        <h3>Payment History</h3>

        <div className="history-toolbar">{historyState.toolbarArr}</div>
        <div className="history-entrybox">{historyState.daysArr}</div>
      </div>
    </div>
  );
}

function entry({ typeInt, amount, category, pm, date }) {
  return (
    <div className="history-entry">
      {(function () {
        switch (typeInt) {
          case -1:
            return <FaArrowTrendDown />;
          case 0:
            return <FaLock />;
          case 1:
            return <FaArrowTrendUp />;
          default:
            return <FaQuestion color="red" />;
        }
      })()}

      <div>{category}</div>
      <div>{amount}</div>
      <img src={pmObj.pmIcons[pm]} alt={pm} />
      <div className="history-entry-time">
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}

function day(date) {
  const id = mth.getDayId(date);
  return (
    <div className="history-day">
      <div className="day-header">{date.toLocalDate()}</div>
      <div className="day-scrollable">{historyState.daysArr[id]}</div>
    </div>
  );
}

function floatingForm() {
  mth.p(1);
  return (
    <div className="floating-form">
      <div className="fill"></div>
      <form>
        {/* <input type="number" name="amount" placeholder=" ...Amount" id="" /> */}

        <Input
          endAdornment={
            <InputAdornment>
              <ContentPaste />{" "}
            </InputAdornment>
          }
        />

        <select name="type" id="">
          <option value={null}>...Entry Type</option>
          <option value={-1}>Cash Out</option>
          <option value={0}>Freeze</option>
          <option value={1}>Cash In</option>
        </select>

        <select name="category" id="">
          <option value={null}>...Category</option>
          <option value={"business"}>Business</option>
          <option value={"personal"}>Personal</option>
        </select>
        <div className="fill"></div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
