import React, { useEffect, useState } from "react";
import mthdss from "./consts/functions";
import objss from "./consts/objects";
import logo from "./img/icons.jpg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Main from "./components/screens/Main";
import AuthScreen from "./components/screens/AuthScreen";
import History from "./components/screens/History";
import NavBar from "./components/screens/NavBar";
import fetchspyStore from "./utils/fetchspyStore";
import updatespyStore from "./utils/updatespyStore";
import { useMediaQuery } from "react-responsive";
import { spyAuth } from "./utils/db";
import Tracker from "./components/screens/Tracker";
import MobLayout from "./components/MobLayout";

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
  const [trackState, settrackState] = useState(
    JSON.parse(localStorage.getItem("trackState"))
  );

  const mobLayout = MobLayout({
    pmState: pmStates,
    objs: objjs,
    signOut: signOut,
    loggedIn: loggedIn
  });

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
              {mobLayout.mobTop}
              <Outlet />
              {mobLayout.mobFooter}
              <ToastContainer position="bottom-right" />
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
                trackState={trackState}
                settrackState={settrackState}
              />
            }
          />
          <Route
            path="track"
            element={
              <Tracker
                trackState={trackState}
                settrackState={settrackState}
                pmobjs={objjs}
              />
            }
          />
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
