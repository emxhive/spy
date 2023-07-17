import PropTypes from "prop-types";
import mthdss from "../consts/functions";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

function Entries({ state, objs, styleId }) {
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

  const mthds = mthdss();

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
                  rowEntry[i] = Figures(pm.balance);
                  break;
                case 2:
                  rowEntry[i] = Figures(pm.frozen);
                  break;
                case 3:
                  rowEntry[i] = Figures(pm.frozen);
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
      <FiEdit style={{ fontSize: 10 }} />
    </div>
  );
}

function Figures(text) {
  return <div className="entries-figures"> {text}</div>;
}

export default Entries;
