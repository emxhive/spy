import React, { useState } from "react";

import "../../css/history.css";
import { FaLock, FaQuestion, FaBeer } from "react-icons/fa";
import { PiTrendUp, PiTrendDown } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";

import mthdss from "../../consts/functions";

const errorIcon = <span>⚠️</span>;

const mth = mthdss();

export default function History({ pmObjs }) {
  const [isDialog, setDialog] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split(".")[0]);

  function openDialogue() {
    if (!isDialog) {
      setDialog(true);
    }
  }

  const [firstState, setFirstState] = useState({
    toolbarArr: [<IoIosAddCircleOutline key="add" onClick={openDialogue} />]
  });
  const daysArr = {};
  const [dayArr, setdayArr] = useState([]);
  const [amountState, setAmS] = useState(false);
  const [typeState, setTyS] = useState(false);
  const [categoryState, setCaS] = useState(false);
  const [paymthState, setPmS] = useState(false);

  function FloatingForm() {
    return (
      <div className="floating-form-box">
        <div className="fill"></div>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();

            const formArr = Array.from(new FormData(e.target).entries());
            let errKey = "";
            let isPerfect = true;

            for (let i = 0; i < formArr.length; i++) {
              const arr = formArr[i];
              if (arr[1] === "") {
                errKey = arr[0];
                isPerfect = false;
                break;
              }
            }

            if (isPerfect) {
              const formObj = Object.fromEntries(formArr);
              const objId = mth.getDayId(new Date(date));
              const newEntry = entry({
                id: objId,
                typeInt: formObj.type,
                amount: formObj.amount,
                category: formObj.category,
                pm: formObj.pm,
                date: formObj.time,
                pmObj: pmObjs
              });

              setdayArr([newEntry, ...dayArr]);

              // For every new entry to dayArr state
              // a corresponding entry to daysArr (grouped from start)
          
              if (Object.keys(daysArr).includes(objId)) {
                mth.p("it exists");
                daysArr[objId].unshift(dayArr[0]);
              } else {
                const newday= daysArr[objId] = []
                newday.unshift(dayArr[0]);
              }
              mth.p(Object.keys(daysArr));
            } else {
              switch (errKey) {
                case "pm":
                  setPmS(true);
                  break;
                case "type":
                  setTyS(true);
                  break;
                case "category":
                  setCaS(true);
                  break;
                default:
                  setAmS(true);
                  break;
              }
            }
          }}
        >
          <div>
            <div>
              <input
                name="time"
                placeholder="...Time"
                type="datetime-local"
                value={date}
                onChange={(e) => {
                  const updateDateState = e.target.value;

                  setDate(updateDateState);
                }}
              />
            </div>
            <div>
              <input
                name="amount"
                placeholder="...Amount"
                defaultValue=""
                type="number"
                onChange={() => {
                  if (amountState) {
                    setAmS(false);
                  }
                }}
              />
              {amountState && errorIcon}
            </div>
            <div>
              <select
                name="pm"
                onChange={() => {
                  if (paymthState) {
                    setPmS(false);
                  }
                }}
              >
                <option value="">...Payment Method</option>
                {Object.keys(pmObjs.midEntryPm).map((keys) => {
                  if (pmObjs.midEntryPm[keys]?.ispm)
                    return (
                      <option key={keys} value={keys}>
                        {keys}
                      </option>
                    );
                })}
              </select>
              {paymthState && errorIcon}
            </div>

            <div>
              <select
                name="type"
                id=""
                onChange={() => {
                  if (typeState) {
                    setTyS(false);
                  }
                }}
              >
                <option value={""}>...Entry Type</option>
                <option value={-1}>Cash Out</option>
                <option value={0}>Freeze</option>
                <option value={1}>Cash In</option>
              </select>

              {typeState && errorIcon}
            </div>
            <div>
              <select
                name="category"
                id=""
                onChange={() => {
                  if (categoryState) {
                    setCaS(false);
                  }
                }}
              >
                <option value={""}>...Category</option>
                <option value={"business"}>Business</option>
                <option value={"personal"}>Personal</option>
              </select>
              {categoryState && errorIcon}
            </div>
            <div className="fill"></div>

            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }

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
        {isDialog && FloatingForm()}
        <h3>Payment History</h3>

        <div className="history-toolbar">{firstState.toolbarArr}</div>
        <div className="history-entrybox">{dayArr}</div>
      </div>
    </div>
  );
}

function entry({ id, typeInt, amount, category, pm, date, pmObj }) {
  const retObj = (
    <div
      dayid={id}
      key={mth.getTimeId(date)}
      timeid={mth.getTimeId(date)}
      className="history-row-entry"
    >
      <div>
        {(function () {
          switch (typeInt) {
            case -1:
              return <PiTrendDown />;
            case 0:
              return <FaLock />;
            case 1:
              return <PiTrendUp />;
            default:
              return <FaQuestion color="red" />;
          }
        })()}
      </div>

      <div>{category}</div>
      <div>{amount}</div>
      <img src={pmObj.pmIcons[pm]} alt={pm} />
      <div className="history-entry-time">
        {new Date(date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </div>
    </div>
  );

  return retObj;
}

function day(dayEntries, date) {
  const id = mth.getDayId(date);
  return (
    <div className="history-day">
      <div className="day-header">{date.toLocalDate()}</div>
      <div className="day-scrollable">{dayEntries.daysArr[id]}</div>
    </div>
  );
}
