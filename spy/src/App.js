import React, { useEffect, useState } from "react";
import mthdss from "./consts/functions";
import objss from "./consts/objects";
import logo from "./img/icons.jpg";

import Main from "./components/screens/Main";
import History from "./components/screens/History";
import NavBar from "./components/screens/NavBar";
import fetchspyStore from "./utils/fetchspyStore";
import updatespyStore from "./utils/updatespyStore";
import { useMediaQuery } from 'react-responsive';


function App() {


  const [pmStates, setpmStates] = useState(objss().before());
  const [pmIcons, setpmIcons] = useState(objss().pmIcons);
  const objjs = objss().after(pmStates, pmIcons);
  const mthdds = mthdss(pmStates, setpmStates);
  const isPc = useMediaQuery({ query: "(min-width: 900px)" });


  //To fetch data as soon as data loads.. data from object.js is loaded first but shortly replaced by data from firebase if any.
  useEffect(() => {
    async function fetchData() {
      const fetchedInfo = await fetchspyStore({ spyCollection: "pmstate" });
      const fetchedIcons = await fetchspyStore({ spyCollection: "pmicons" });

      if (fetchedIcons) {
        setpmIcons(fetchedIcons);
      }
      if (fetchedInfo) {
        setpmStates(fetchedInfo);
      } else {
        updatespyStore({ spyCollection: "pmstate", dataUpdate: pmStates });
        if (fetchspyStore({ spyCollection: "pmstate" })) {
          setpmStates(fetchedInfo);
        } else {
          console.error("PMSATE REFUSES TO UPLOAD TO FIREBASE");
        }
      }



    }

    fetchData();

  }, []);

  // Data feching ends here

  const pcVersion = (
    <div className="main-parent">
      <NavBar applogo={logo} />
      <Main
        mthds={mthdds}
        objs={objjs}
        pmIcons={pmIcons}
        setpmIcons={setpmIcons}
        pmState={pmStates}
        setpmState={setpmStates}
      />
      <History
        pmObjs={objjs}
        pmIcons={pmIcons}
        pmState={pmStates}
        setpmState={setpmStates}
      />
    </div>
  );

  const mobileVersion = (
    <div className="main-parent">
      <Main
        mthds={mthdds}
        objs={objjs}
        pmIcons={pmIcons}
        setpmIcons={setpmIcons}
        pmState={pmStates}
        setpmState={setpmStates}
      />
    </div>
  );;




  return (isPc ? pcVersion : mobileVersion);
}

export default App;
