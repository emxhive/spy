import { Link } from "react-router-dom";
import { useState } from "react";

import mthdss from "../consts/functions";
import objss from "../consts/objects";
import "../css/moblayout.css";

export default function MobLayout({ pmState, objs, signOut, loggedIn }) {
  const [usdDisplay, setusdDisplay] = useState(true);
  //true for net, false for all
  const [toogleState, setToogleState] = useState(true);

  const lastObj = objss().theEnd(objs, usdDisplay);

  const mthds = mthdss();
  // console.log(lastObj.balanceState);
  return {
    mobTop: (
      <div className="mob-layout-top">
        <div className="mtbal-title">Total Balance</div>
        <div className="mob-top-balance-box-skin">
          {toogleState ? (
            <div className="mob-top-balance-box">
              <div className="tb-main-bal">{lastObj.toogleState.info.a}</div>
              <div className="tb-blur-bal">{lastObj.toogleState.info.b}</div>
              <div className="tb-blur-bal">{lastObj.toogleState.info.c}</div>
            </div>
          ) : (
            <div className="mob-top-balance-box">
              <div className="tb-main-bal">{lastObj.balanceState.info.a}</div>
              <div className="tb-blur-bal">{lastObj.balanceState.info.b}</div>
            </div>
          )}

          <div className="mob-top-balance-options-box">
            <div className="">USD</div>
            <div className="">NGN</div>
            <div className="">NET</div>
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
    ),
    mobFooter: (
      <div className="footer-formobile">
        <div className="moreoptions-box">
          <div className="bottom-balance-view">
            <div className="">
              {objs.symbols.usd}
              {mthds.tidyFig(objs.pmAmount.netInUsd - objs.pmAmount.netInUsdF)}
            </div>
            <div className="">
              {objs.symbols.ngn}
              {mthds.tidyFig(objs.pmAmount.netInNgn - objs.pmAmount.netInNgnF)}
            </div>
          </div>
          <div className="bottom-view-rate">{pmState.generalProps.rate}</div>
          {/* {console.log(objs)} */}
          <div className="fill" />
          <div onClick={signOut} className="moreoptions-text">
            <div className="more-text">Options</div>
          </div>
          <img src={loggedIn?.photoURL} alt="icon" className="moreoptions-img" />
        </div>
      </div>
    )
  };
}
