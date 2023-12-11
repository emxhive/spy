import PropTypes from "prop-types";
import mthdss from "../consts/functions";
import { FiEdit } from "react-icons/fi";
import {
  createElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentEditable from "react-contenteditable";
import { PiBroomLight } from "react-icons/pi";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

const mthds = mthdss();

function Entries({
  setEdit,
  edit,
  state,
  balance,
  frozen,
  spend,
  isPc,
  showsavebuttons,
  setshowbuttons,
  setCurrentEntry,
  objs,
  styleId,
}) {
  const [focusState, setFocusState] = useState(false);
  const contentEditStyle = useRef({});

  const currentFocus = useRef();
  const elementX = document.createElement("span");
  const rootIsh = createRoot(elementX);

  const clickCount = useRef(0);
  const focusing = useRef(false);
  const stayFocused = useRef(false);

  //setting the edit state

  useEffect(() => {
    const localstateobj = {};

    ///CONSOLE
    Object.keys(state).forEach((key) => {
      if (key !== "generalProps") {
        localstateobj[key] = true;
      }
    });

    setEdit(localstateobj);
  }, [state]);

  const objsArr = [];
  for (const key in objs) {
    const pm = objs[key];
    if (pm?.ispm) {
      objsArr.push(pm);
    }
  }

  objsArr.sort((b, a) => {
    if (a.isUsd && b.isUsd) {
      return a.equivalent - a.frozenEq - (b.equivalent - b.frozenEq);
    }
    if (a.isUsd) {
      return a.equivalent - a.frozenEq - (b.balance - b.frozen);
    }
    if (b.isUsd) {
      return a.balance - a.frozen - (b.equivalent - b.frozenEq);
    }
    return a.balance - a.frozen - (b.balance - b.frozen);
  });

  //functions that were once without

  function NameYIcon(text, image) {
    const regex = /\d/g;
    const newtext =
      text.search(regex) > -1
        ? `${text.slice(0, text.search(regex))}(${text.slice(
            text.search(regex)
          )})`
        : text;

    return (
      <div key={newtext} className="entries-name-Y-icon">
        <img src={image} alt="icon" />
        <span> {newtext}</span>
        <div style={{ flexGrow: 1 }}></div>
        <FiEdit
          key={"editButton"}
          className="edit-button"
          ///--------ON CLICK --------??/////
          onClick={function () {
            if (!showsavebuttons) {
              if (edit[text]) {
                setEdit({ ...edit, [text]: false });
              }

              setshowbuttons(true);
              setCurrentEntry(text);
            }
          }}
          style={!edit[text] && { stroke: "#0056a1", fontSize: "18px" }}
        />
      </div>
    );
  }

  ///////////////////////FIGURES/////////////////
  function Figures(text, key, id, symbol) {
    let textz;
    let spanSymbol = "";
    let isChanging = false;

    switch (key) {
      case "balance":
        spanSymbol = <span key={"currency"}>{symbol}</span>;
        textz = balance;
        break;
      case "frozen":
        textz = frozen;
        break;
      case "spend":
        textz = spend;
        break;

      default:
      // throw new Error("It is not balance not frozen nor spend .. wtf is it");
    }
    text = mthds.tidyFig(text);
    const handleChange = (e) => {
      
      stayFocused.current = false;
      if (!isChanging) {
        isChanging = true;
      }

      textz.current = mthds.tidyFig(mthds.toDigits(e.target.value));
    };

    return (
      <div key={`figuresdiv-${id}-${key}`} className="div-with-contenteditable">
        {spanSymbol}

        <ContentEditable
          key={key}
          ref={currentFocus}
          className="entries-figures content-edit"
          disabled={edit[id]}
          html={text}
          onClick={(e) => {
            try {
              // navigator.clipboard.writeText(
              //   Number(e.target.innerText.replaceAll(",", ""))
              // );
            } catch (e) {
              console.error();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            let copiedData = e.clipboardData.getData("text/plain");
            copiedData = mthds.tidyFig(mthds.toDigits(copiedData));
            e.target.innerText = copiedData;

            isChanging = true;
          }}
          onFocus={(e) => {
            if (clickCount.current == 1) {
              elementX.remove();
              focusing.current = true;
            }

            const eFocus = e;

            if (clickCount.current < 1 || focusing.current) {
              flushSync(() => {
                rootIsh.render(
                  <PiBroomLight
                    className="clear-contentedit"
                    onClick={(e) => {
                      stayFocused.current = true;

                      eFocus.target.innerText = 0;
                    }}
                  />
                );
              });
              e.target.insertAdjacentElement("afterend", elementX);
              clickCount.current = 1;
            }
          }}
          onBlur={(e) => {
            setTimeout(() => {
              if (!stayFocused.current && !focusing.current) {
                elementX.remove();
                clickCount.current = 0;
              }

              focusing.current = false;
            }, 500);
            if (isChanging) {
              e.target.innerText = textz.current;
            }
          }}
          onChange={handleChange}
        />
      </div>
    );
  }

  function editButtonOthers(text) {
    return (
      <FiEdit
        key={"editButton"}
        className="edit-button"
        ///--------ON CLICK --------??/////
        onClick={function () {
          if (!showsavebuttons) {
            if (edit[text]) {
              setEdit({ ...edit, [text]: false });
            }

            setshowbuttons(true);
            setCurrentEntry(text);
          }
        }}
        style={!edit[text] && { stroke: "#0056a1", fontSize: "18px" }}
      />
    );
  }

  function mobileRow(pm) {
    const regexW = /.+\d+$/g;
    const regexE = /\d+$/g;
    let number = null;
    const name =
      pm.id.search(regexW) > -1
        ? (() => {
            const x = pm.id.search(regexE);
            number = pm.id.slice(x);
            return pm.id.slice(0, x);
          })()
        : pm.id;

    return (
      <div className="mob-entryrow-box-x-flex">
        <img src={pm.icon} alt="ico" />
        <div className="mob-figures-box-y-flex">
          <div className="mob-entry-available-balance">
            <div className="mob-entry-label">
              <div className="mob-entry-floating-number">{number}</div>
              {name}
            </div>
            {Figures(
              pm.balance - pm.frozen - pm.payFee,
              "balance",
              pm.id,
              pm.balance - pm.frozen - pm.payFee > 0 ? pm.symbol : ""
            )}
          </div>
          {(!edit[pm.id] || pm.frozen > 0) && (
            <div className="mob-entry-blur mob-entry-frozen">
              <div className="mob-entry-label">Frozen</div>
              {Figures(pm.frozen, "frozen", pm.id, "")}
            </div>
          )}
          {pm.percentFee > 0 && (
            <div className="mob-entry-blur mob-entry-fee">
              <div className="mob-entry-label">Potential Fee</div>
              <div className="payfee-value">{mthds.tidyFig(pm.payFee)}</div>
            </div>
          )}
          {(pm.frozen > 1 || pm.payFee > 1) && (
            <div className="mob-entry-blur mob-entry-total">
              <div className="mob-entry-label">Total</div>
              <div className="total-div">{mthds.tidyFig(pm.balance)}</div>
            </div>
          )}
        </div>
        {editButtonOthers(pm.id)}
      </div>
    );
  }

  ////entry bodies to be returned.. pc & mobile

  //PC
  const entriesPc = (
    <div className="entries-main-body" id={styleId}>
      {(function () {
        const divs = [];
        objsArr.forEach((pm) => {
          if (pm.ispm) {
            const rowEntry = [];
            for (let i = 0; i < 4; i++) {
              switch (i) {
                case 0:
                  rowEntry[i] = NameYIcon(pm.id, pm.icon);
                  break;
                case 1:
                  rowEntry[i] = Figures(
                    pm.balance - pm.frozen - pm.payFee,
                    "balance",
                    pm.id,
                    pm.symbol
                  );
                  break;
                case 2:
                  rowEntry[i] = Figures(pm.frozen, "frozen", pm.id, pm.symbol);
                  break;
                case 3:
                  rowEntry[i] = Figures(pm.spend, "spend", pm.id, pm.symbol);
                  break;

                default:
                  rowEntry[i] = Figures(pm.id);
              }
            }

            divs.push(
              <div key={pm.id + new Date().getTime()} className="entry-row">
                {rowEntry}
              </div>
            );
          }
        });

        return divs;
      })()}
    </div>
  );

  //MOBILE
  const entriesMobile = (
    <div className="entries-main-body" id={styleId}>
      {(function () {
        const divs = [];
        objsArr.forEach((pm) => {
          if (pm.ispm) {
            divs.push(
              <div key={pm.id + new Date().getTime()} className="entry-row">
                {mobileRow(pm)}
              </div>
            );
          }
        });

        return divs;
      })()}
    </div>
  );

  return isPc ? entriesPc : entriesMobile;
}

export default Entries;
