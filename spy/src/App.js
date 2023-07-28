
import React, { useState } from "react";
import mthdss from "./consts/functions";
import objss from "./consts/objects";

import Main from "./components/screens/Main";
import History from "./components/screens/History";
import NavBar from "./components/screens/NavBar";

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
