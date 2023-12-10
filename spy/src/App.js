import React, { useEffect, useState, useRef } from "react";
import mthdss from "./consts/functions";
import objss from "./consts/objects";
import logo from "./img/icons.jpg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { SetTrackContext, TrackContext, HistoryWatch } from "./Context";

function App() {
  const admin = "okpakomaraez@gmail.com";
  const [pmStates, setpmStates] = useState(objss().before());
  const [pmIcons, setpmIcons] = useState(objss().pmIcons);
  const objjs = objss().after(pmStates, pmIcons);

  // localStorage.clear();

  const mth = mthdss(pmStates, setpmStates);

  const isPc = useMediaQuery({ query: "(min-width: 900px)" });
  const [loggedIn, setLogStatus] = useState(
    JSON.parse(localStorage.getItem("logged"))
  );
  const [trackState, settrackState] = useState(
    sortTrackData(JSON.parse(localStorage.getItem("trackState")))
  );

  const historyWatch = {
    status: false,
    data: 0
  };

  // localStorage.setItem("pendingHistEntry", "false");

  const mobLayout = MobLayout({
    pmState: pmStates,
    objs: objjs,
    signOut: signOut,
    loggedIn: loggedIn,
  });

  //To fetch data as soon as data loads.. data from object.js is loaded first but shortly
  // replaced by data from firebase if any.
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

    if (loggedIn?.email === admin) {
      monthlyCheck(trackState, settrackState);
      fetchData();
    }
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
        mthds={mth}
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
    <TrackContext.Provider value={trackState}>
      <SetTrackContext.Provider value={settrackState}>
        <HistoryWatch.Provider value={historyWatch}>
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
                      mthds={mth}
                      objs={objjs}
                      pmIcons={pmIcons}
                      setpmIcons={setpmIcons}
                      pmState={pmStates}
                      setpmState={setpmStates}
                    />
                  }
                />
                <Route path="track" element={<Tracker pmobjs={objjs} />} />
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
        </HistoryWatch.Provider>
      </SetTrackContext.Provider>
    </TrackContext.Provider>
  );

  if (loggedIn) {
    return isPc ? pcVersion : mobileVersion;
  } else {
    return <AuthScreen setlogStatus={setLogStatus} />;
  }
}

export default App;
let firstTime = true;

function sortTrackData(trackState) {
  const TRACKSTATUSKEY = "trackSortedStatus";
  const TRACKSTATEKEY = "trackState";
  const checker = JSON.parse(localStorage.getItem(TRACKSTATUSKEY));
  const settrackStatus = () => {
    localStorage.setItem(TRACKSTATUSKEY, "true");
  };
  const getMonthNo = (id) => {
    const currentYear = new Date().getFullYear();
    const date = new Date(Number(id.replace("t", "")));
    let no;

    if (currentYear === new Date().getFullYear()) {
      no = new Date().getMonth() - date.getMonth();
    } else if (new Date().getFullYear - 1 === currentYear) {
      no = new Date().getMonth() + 11 - date.getMonth();
    }

    return no;
  };
  const result = [];

  for (let i = 0; i < 7; i++) {
    result.push({ obj: {}, ids: [] });
  }

  if (checker === true) {
    return trackState;
  } else if (trackState) {
    const keys = Object.keys(trackState);

    if (keys[0]) {
      if (keys[0].includes("m")) {
        settrackStatus();
      } else {
        keys.sort((a, b) => b.replace("t", "") - a.replace("t", ""));
        keys.forEach((key) => {
          const x = getMonthNo(key);
          if (x > -1 && x < 7) {
            result[x].obj[key] = trackState[key];
            result[x].ids.push(key);
          }
        });

        settrackStatus();
        localStorage.setItem(TRACKSTATEKEY, JSON.stringify(result));
        return result;
      }
    }
  }
}

function monthlyCheck(trackState, settrackState) {
  if (firstTime && trackState) {
    const track = [];
    for (let i = 0; i < 7; i++) {
      track[i] = trackState[i];
    }
    const fxn = mthdss();
    let data = Number(fxn.fromLocalStorage("month"));
    function updateTrack(track) {
      track.pop();
      track.unshift({ obj: {}, ids: [] });
    }
    let repeat = true;

    do {
      if (data) {
        if (data !== new Date().getMonth()) {
          updateTrack(track);
          data++;
        } else {
          repeat = false;
          fxn.toLocalStorage("month", data);
          fxn.toLocalStorage("trackState", track);
          settrackState(track);
        }
      } else {
        const track0 = track[0];
        if (track0.ids.length > 0) {
          const id = track0.ids[track0.ids.length - 1];
          const date = fxn.idtoDate(id);
          let data1 = date.getMonth();
          if (data1 !== new Date().getMonth()) {
            updateTrack(track);
            data1++;
          } else {
            repeat = false;
            fxn.toLocalStorage("month", data1);
            fxn.toLocalStorage("trackState", track);
            settrackState(track);
          }
        }
      }
    } while (repeat);

    firstTime = false;
  }
}
