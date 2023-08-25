import React, { useState } from "react";

import "../../css/history.css";
import { FaLock, FaUnlock, FaQuestion } from "react-icons/fa";
import { PiTrendUp, PiTrendDown } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import mthdss from "../../consts/functions";
import { db } from "../../utils/db";
import { addDoc, collection } from "firebase/firestore";


const errorIcon = <span>⚠️</span>;
const mth = mthdss();

export default function History({ pmObjs, pmIcons, pmState, setpmState }) {
  const [isDialog, setDialog] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split(".")[0]);

  function openDialogue() {
    if (!isDialog) {
      setDialog(true);
    }
  }

  const [firstState, setFirstState] = useState({
    toolbarArr: [<IoIosAddCircleOutline key="add" onClick={openDialogue} />],
  });

  const [dayArr, setdayArr] = useState({});
  const [isnewdayState, setnewday] = useState(true);
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
              formObj.amount = Number(formObj.amount);
              formObj.type = Number(formObj.type);
              const objId = mth.getDayId(new Date(date));
              const newEntry = entry({
                id: objId,
                typeInt: formObj.type,
                amount: pmState[formObj.pm].symbol + formObj.amount,
                category: formObj.category,
                pm: formObj.pm,
                date: formObj.time,
                pmIcons: pmIcons,
              });

              
              //updating balance in pmState /App-main screen
              const preBal = pmState[formObj.pm].balance;
              const preFreeze = pmState[formObj.pm].frozen;
              const pm = pmState[formObj.pm];

              switch (formObj.type) {
                case -2:
                  setpmState({
                    ...pmState,
                    [formObj.pm]: { ...pm, frozen: preFreeze - formObj.amount },
                  });

                  break;
                case -1:
                  setpmState({
                    ...pmState,
                    [formObj.pm]: { ...pm, balance: preBal - formObj.amount },
                  });

                  break;
                case 1:
                  setpmState({
                    ...pmState,
                    [formObj.pm]: { ...pm, balance: preBal + formObj.amount },
                  });

                  break;
                default:
                  setpmState({
                    ...pmState,
                    [formObj.pm]: { ...pm, frozen: preFreeze + formObj.amount },
                  });
              }

              if (Object.keys(dayArr).includes(objId)) {
                setnewday(false);

                const old = dayArr[objId];

                const newArr = [newEntry, ...old];
                setdayArr({ ...dayArr, [objId]: newArr });
              } else {
                setnewday(true);

                setdayArr({ ...dayArr, [objId]: [newEntry] });
              }

              // For every new entry to dayArr state
              // a corresponding entry to daysArr (grouped from start)
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
                {Object.keys(pmObjs.pmAmount.all).map((keys) => {
                  if (pmObjs.pmAmount.all[keys]?.ispm)
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
                <option value={2}>Freeze</option>
                <option value={-2}>UnFreeze</option>
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
        <div className="history-entrybox">
          {Object.keys(dayArr)
            .map((keyz) => {
              // printing the payment history here

              return day(dayArr[keyz], isnewdayState);
            })
            .sort(
              (b, a) =>
                a.props.dayid.replace("d", "") - b.props.dayid.replace("d", "")
            )}
        </div>
      </div>
    </div>
  );
}

function entry({ id, typeInt, amount, category, pm, date, pmIcons }) {
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
            case 2:
              return <FaLock />;
            case -2:
              return <FaUnlock />;
            case 1:
              return <PiTrendUp />;
            default:
              return <FaQuestion />;
          }
        })()}
      </div>

      <div>{category}</div>
      <div>{amount}</div>
      <img src={pmIcons[pm]} alt={pm} />
      <div className="history-entry-time">
        {new Date(date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );

  return retObj;
}

function day(divArr, isnewday) {
  const objid = divArr[0].props.dayid;
  let time;
  let currentDate;
  if (isnewday) {
    time = divArr[0].key?.replace("t", "");
  } else {
    time = divArr[0].key?.replace("t", "");
  }
  currentDate = new Date(new Date().setTime(time));
  const options = {
    weekday: "short",
    year: "numeric",
    day: "numeric",
    month: "long",
  };
  return (
    <div key={objid} dayid={objid} className="history-day">
      <div className="day-header">
        {currentDate.toLocaleDateString([], options)}
      </div>
      <div className="day-scrollable">{divArr}</div>
    </div>
  );
}
