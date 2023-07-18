import PropTypes from "prop-types";
import mthdss from "../consts/functions";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

const mthds = mthdss();
let pmState;
let setpmS;
let editState;
let localState;

function Entries({ state, setpmState, objs, styleId }) {
  pmState = state;
  setpmS = setpmState;
  const [edit, setEdit] = useState(true);
  editState = setEdit;
  localState = edit;
  const objsArr = [];
  for (const key in objs) {
    const pm = objs[key];
    if (pm?.ispm) {
      objsArr.push(pm);
    }
  }
  objsArr.sort((b, a) => {
    if (a.isUsd) {
      return a.equivalent - b.balance;
    }
    return a.balance - b.balance;
  });

  return (
    <div className="entries-main-body" id={styleId}>
      {(function () {
        const divs = [];
        console.log(objs);
        objsArr.forEach((pm) => {
          if (pm.ispm) {
            const rowEntry = [];
            for (let i = 0; i < 4; i++) {
              switch (i) {
                case 0:
                  rowEntry[i] = NameYIcon(pm.id, pm.icon);
                  break;
                case 1:
                  rowEntry[i] = Figures(pm.balance, "balance", pm.id);
                  break;
                case 2:
                  rowEntry[i] = Figures(pm.frozen, "frozen", pm.id);
                  break;
                case 3:
                  rowEntry[i] = Figures(pm.frozen, "frozen", pm.id);
                  break;

                default:
                  rowEntry[i] = Figures(pm.id);
              }
            }
            divs.push(<div className="entry-row">{rowEntry}</div>);
          }
        });

        return divs;
      })()}
    </div>
  );
}

function NameYIcon(text, image) {
  return (
    <div className="entries-name-Y-icon">
      <img src={image} alt="icon" />
      {text}
      <div style={{ flexGrow: 0.7 }}></div>
      <FiEdit
        onClick={function () {
          editState(false);
        }}
        style={{ fontSize: 10 }}
      />
    </div>
  );
}

function Figures(text, key, id) {
  return (
    <ContentEditable
      className="entries-figures content-edit"
      disabled={localState}
      html={mthds.tidyFig(text)}
      onChange={function (e) {
        const obj = {
          ...pmState[id],
          key: e.target.value,
        };
        setpmS(obj);
      }}
    />
  );
}
export default Entries;
