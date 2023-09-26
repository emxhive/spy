import React, { useEffect, useState } from "react";
import mthdss from "./consts/functions";
import objss from "./consts/objects";
import logo from "./img/icons.jpg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link
} from "react-router-dom";

import Main from "./components/screens/Main";
import AuthScreen from "./components/screens/AuthScreen";
import History from "./components/screens/History";
import NavBar from "./components/screens/NavBar";
import fetchspyStore from "./utils/fetchspyStore";
import updatespyStore from "./utils/updatespyStore";
import { useMediaQuery } from "react-responsive";
import { spyAuth } from "./utils/db";
import Tracker from "./components/screens/Tracker";

function App() {
  const admin = "okpakomaraez@gmail.com";
  const [pmStates, setpmStates] = useState(objss().before());
  const [pmIcons, setpmIcons] = useState(objss().pmIcons);
  const objjs = objss().after(pmStates, pmIcons);

  const mthdds = mthdss(pmStates, setpmStates);
  const isPc = useMediaQuery({ query: "(min-width: 900px)" });
  const [loggedIn, setLogStatus] = useState(
    JSON.parse(localStorage.getItem("logged"))
  );
  // const [usdDIsplay, setusdDisplay] = useState(true);
  // const [balanceState, setBalanceState] = useState(lastObjs.balanceState);
  // const [balanceToggle, setBalanceToggle] = useState(lastObjs.toogleState);

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

    if (loggedIn?.email === admin) fetchData();
  }, [loggedIn]);

  // Data feching ends here

  function signOut() {
    spyAuth.signOut().then(() => {
      console.log("logged out");
      setLogStatus(null);
      setpmStates(objss().before());
      localStorage.setItem("logged", null);
    });
  }

  const mobTop = (
    <div className="mob-layout-top">
      <div className="mob-top-balance-box-skin">
        <div className="mob-tob-balance-box"></div>
        <div className="mob-tob-balance-options-box">
          <div className="">USD</div>
          <div className="">NGN</div>
          <div className=""></div>
        </div>
      </div>
      <div className="mob-top-navbar">
        <div>
          <Link to="/">Overview</Link>
        </div>
        <div>
          <Link to="/track">Records</Link>
        </div>
        <div>
          <Link to="/history">History</Link>
        </div>
      </div>
    </div>
  );
  const mobFooter = (
    <div className="footer-formobile">
      <div className="moreoptions-box">
        <div className="bottom-balance-view">
          <div className="">
            {objjs.symbols.usd}
            {mthdds.tidyFig(objjs.pmAmount.netInUsd - objjs.pmAmount.netInUsdF)}
          </div>
          <div className="">
            {objjs.symbols.ngn}
            {mthdds.tidyFig(objjs.pmAmount.netInNgn - objjs.pmAmount.netInNgnF)}
          </div>
        </div>
        <div className="bottom-view-rate">{pmStates.generalProps.rate}</div>
        {/* {console.log(objs)} */}
        <div className="fill" />
        <div onClick={signOut} className="moreoptions-text">
          <div className="more-text">Options</div>
        </div>
        <img src={loggedIn.photoURL} alt="icon" className="moreoptions-img" />
      </div>
    </div>
  );
  const pcVersion = (
    <div className="main-parent">
      <NavBar applogo={logo} />
      <Main
        isPc={isPc}
        loggedIn={loggedIn}
        setlogStatus={setLogStatus}
        signOut={signOut}
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-parent">
              {mobTop}
              <Outlet />
              {mobFooter}
            </div>
          }
        >
          <Route
            index
            element={
              <Main
                isPc={isPc}
                loggedIn={loggedIn}
                setlogStatus={setLogStatus}
                signOut={signOut}
                mthds={mthdds}
                objs={objjs}
                pmIcons={pmIcons}
                setpmIcons={setpmIcons}
                pmState={pmStates}
                setpmState={setpmStates}
              />
            }
          />
          <Route path="track" element={<Tracker />} />
          <Route
            path="history"
            element={
              <History
                pmObjs={objjs}
                pmIcons={pmIcons}
                pmState={pmStates}
                setpmState={setpmStates}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );

  if (loggedIn) {
    return isPc ? pcVersion : mobileVersion;
  } else {
    return <AuthScreen setlogStatus={setLogStatus} />;
  }
}

export default App;
