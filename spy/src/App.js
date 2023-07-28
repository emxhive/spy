import BalContainer from "./components/BalContainer";

import logo from "./img/icons.jpg";
import React, { useState } from "react";
import mthdss from "./consts/functions";
import objss from "./consts/objects";
import Main from "./components/Main";

import History from "./components/History";

import NavBar from "./components/NavBar";

function App() {
  const [isPc, setPc] = useState(true);
  const [pmStates, setpmStates] = useState(objss().before());
  const objjs = objss().after(pmStates);
  const mthdds = mthdss(pmStates, setpmStates);

  return (
    <div className="main-container">
      {/* <NavBar applogo={logo} />
      <Main
        mthds={mthdds}
        objs={objjs}
        pmState={pmStates}
        setpmState={setpmStates}
      /> */}
      <History pmObjs={objjs} />
    </div>
  );
}

export default App;
