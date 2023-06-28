import "./App.css";
import BalContainer from "./components/BalContainer";
import icon from "./img/icons.jpg";
import React from "react";

function App() {
  return (
    <div className="main-container">
      {/* navigation  bar to the left  */}
      <div className="left-nav">
        <a href=".">
          <img src={icon} alt="LOGO" />
          <h2>emxhive</h2>

        </a>
        <a href=".">Dashbord</a>
        <a href=".">Income History</a>
        <a href=".">Expenses</a>
        <a href=".">Settings</a>
      </div>

      {/* main content */}
      <div className="main-content">
        <h1>... S ⭐ P ⭐ Y</h1>
        <div className="balance-container">
          <BalContainer amount={0} currency=" USD" />
          <BalContainer amount={0} currency=" NGN" />
        </div>
        <hr />


        {/* progress Bar section*/}

        <div className="mid"> 
        
        </div>

      </div>
    </div>
  );
}

export default App;
