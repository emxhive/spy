import PropTypes from "prop-types";
import mthdss from "../consts/functions";
import { FiEdit } from 'react-icons/fi'

function Entries({ state, objs }) {
  const mthds = mthdss();
  const keys = Object.keys(objs.pmIcons);

  return (
    <div className="entries-main-body">
      {keys.map((key) => {
        if (state[key]?.ispm) {
          const icon = objs.pmIcons[key];
          const balance = state[key]?.balance;
          const frozen = state[key]?.frozen;

          const rowEntry = [];
          for (let i = 0; i < 4; i++) {
            switch (i) {
              case 0:
                rowEntry[i] = NameYIcon(key, icon);
                break;
              case 1:
                rowEntry[i] = Figures(balance);
                break;
              case 2:
                rowEntry[i] = Figures(frozen);
                break;
              case 3:
                rowEntry[i] = Figures(frozen);
                break;

              default:
                rowEntry[i] = Figures(key);
            }
          }
          return <div className="entry-row">{rowEntry}</div>;
        }
      })}
    </div>
  );
}

function NameYIcon(text, image) {
  return (
    <div className="entries-name-Y-icon">

      <img src={image} alt="icon" />
      {text}
      <div style={{flexGrow: 0.9}}></div>
      <FiEdit style={{fontSize: 10 }} />
    </div>
  );
}

function Figures(text) {
  return <div className="entries-figures"> {text}</div>;
}

export default Entries;
