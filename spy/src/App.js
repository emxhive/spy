import BalContainer from "./components/BalContainer";
import Progress from "./components/Progress";
import logo from "./img/icons.jpg";
import React, { useState } from "react";
import palm from "./img/palmpay.png";
import opayImg from "./img/opay.png";

function App() {
  const [pmState, setpmState] = useState(
    {
      rate: 770,
      opay: {
        get rate() {
          return this.parent.rate;
        },
        balance: 500000,
        isUsd: false,
      },
      palmpay: {
        get rate() {
          return this.parent.rate;
        },
        balance: 500000,
        isUsd: false,
      },
      wise: {
        get rate() {
          return this.parent.rate;
        },
        isUsd: true,
        balance: 1000,
      },
      airtm: {
        get rate() {
          return this.parent.rate;
        },
        isUsd: true,
        balance: 1000,
      },
      init() {
        this.opay.parent = this;
        this.palmpay.parent = this;
        this.wise.parent = this;
        this.airtm.parent = this;

        delete this.init;
        return this;
      },
    }.init()
  );

  const pmFunc = {
    updateRate(newState, newRate) {
      setpmState(...pmState, ...newState);
    }
  }

  const pmAmount = {
    rate: pmState.rate,
    ngn: {
      palmpay: {
        balance: pmState.palmpay.balance,
        limit: 5000000,
        spend: 1000000,
        get leftover() {
          return this.limit - this.spend;
        },
        get leftoverStr() {
          return this.leftover.toLocaleString();
        },

        get percentSpend() {
          return (this.spend / this.limit) * 100;
        },
      },
      opay: {
        balance: pmState.opay.balance,
        limit: 5000000,
        spend: 2000000,
        get leftover() {
          return this.limit - this.spend;
        },
        get leftoverStr() {
          return this.leftover.toLocaleString();
        },
        get percentSpend() {
          return (this.spend / this.limit) * 100;
        },
      },
      get total() {
        let sum;
        this.forEach((pm) => {
          sum += pm.balance;
        });
        return sum;
      },
    },
    usd: {},
  };

  const pmProgress = {
    palmpay: {
      pmcolor: "rgb(144, 0, 255)",
      percent: pmAmount.ngn.palmpay.percentSpend,
      pmicon: palm,
    },

    opay: {
      pmcolor: "rgba(29,207,159,255)",
      percent: pmAmount.ngn.opay.percentSpend,
      pmicon: opayImg,
    },
  };
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
          <BalContainer amount={0} currency=" USD" />
          <BalContainer amount={0} currency=" NGN" />
        </div>
        <hr />
        {/* progress Bar section*/}
        <div className="mid-section">
          <div className="progress-box">
            <Progress {...pmProgress.palmpay} />
            <Progress {...pmProgress.opay} />
          </div>

          <div className="remainder-box">
            <div> ₦{pmAmount.ngn.palmpay.leftoverStr}</div>
            <div> ₦{pmAmount.ngn.opay.leftoverStr}</div>
          </div>

          <div className="total-bothcurrencies">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
