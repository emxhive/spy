import BalContainer from "./components/BalContainer";
import Progress from "./components/Progress";
import logo from "./img/icons.jpg";
import React, { useState } from "react";
import mthdss from './consts/functions';
import objss from './consts/objects';



function App() {


  
  const [pmState, setpmState] = useState(
    {
      binance: {
        rate: 770,
        isUsd: true,
        balance: 1000
      },
      wise: {
        get rate() {
          return this.parent.binance.rate - 4;
        },
        isUsd: true,
        balance: 1000
      },
      airtm: {
        get rate() {
          return this.parent.binance.rate - 20;
        },
        isUsd: true,
        balance: 1000
      },

      opay: {
        get rate() {
          return this.parent.airtm.rate;
        },
        balance: 500000,
        isUsd: false
      },
      palmpay: {
        get rate() {
          return this.parent.airtm.rate;
        },
        balance: 500000,
        isUsd: false
      },

      init() {
        this.opay.parent = this;
        this.palmpay.parent = this;
        this.wise.parent = this;
        this.airtm.parent = this;
        this.binance.parent = this;

        delete this.init;
        return this;
      }
    }.init()
  );
  const objs = objss(pmState);
  const mthds = mthdss(pmState, setpmState);


 
  return (
    <div className="main-container">
      {" "}
      {/* navigation  bar to the left  */}{" "}
      <div className="left-nav">
        <a href=".">
          <img src={logo} alt="LOGO" />
          <h2> emxhive </h2>{" "}
        </a>{" "}
        <a href="."> Dashbord </a> <a href="."> Income History </a>{" "}
        <a href="."> Expenses </a> <a href="."> Settings </a>{" "}
      </div>
      {/* main content */}{" "}
      <div className="main-content">
        <h1> ...S⭐ P⭐ Y </h1>{" "}
        <div className="balance-container">
          <BalContainer amount={mthds.tidyFig(objs.pmAmount.netUsd)} currency="$" />
          <BalContainer amount={mthds.tidyFig(objs.pmAmount.netNgn)} currency="₦" />
        </div>
        <hr />
        {/* progress Bar section*/}
        {/* ------------------------------------------------------- */}
        <div className="mid-section">
          <div className="progress-group">
            <div className="progress-box">
              <Progress {...objs.pmProgress.palmpay} />
              <Progress {...objs.pmProgress.opay} />
            </div>

            <div className="remainder-box">
              <div> {objs.symbols.ngn + objs.pmAmount.ngn.palmpay.leftoverStr}</div>
              <div> {objs.symbols.ngn + objs.pmAmount.ngn.opay.leftoverStr}</div>
            </div>
          </div>

          {/* ------------------------------------------------------------mess of amounts- both currencies____________ */}
          <div className="total-bothcurrencies">
            <div className="mid-labels">active</div>
            <div className="mid-labels"> frozen</div>
            <div className="mid-labels">total</div>
            <div className="mid-main-value">
              {objs.symbols.usd}{mthds.tidyFig(objs.pmAmount.netInUsd - objs.pmAmount.netInUsdF)}
            </div>
            <div className="mid-minor-value"> {objs.symbols.usd}{mthds.tidyFig(objs.pmAmount.netInUsdF)}</div>
            <div className="mid-minor-value"> {objs.symbols.usd}{mthds.tidyFig(objs.pmAmount.netInUsd)}</div>
            <div className="mid-main-value">
              {objs.symbols.ngn}{mthds.tidyFig(objs.pmAmount.netInNgn - objs.pmAmount.netInNgnF)}</div>
            <div className="mid-minor-value"> {objs.symbols.ngn}{mthds.tidyFig(objs.pmAmount.netInNgnF)}</div>
            <div className="mid-minor-value"> {objs.symbols.ngn}{mthds.tidyFig(objs.pmAmount.netInNgn)}</div>
          </div>

          {/* -------------------------------------------------------------------end------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
}

export default App;
