import { useState, useRef } from "react";
import { Tooltip } from "react-tooltip";
import BalContainer from "../BalContainer";
import Entries from "../Entries";
import EntryHead from "../EntryHead";
import MidToolBar from "../MidToolBar";
import Progress from "../Progress";
import ReModal from "../ReModal";
import PMForm from "../PMForm";
import { spyAuth } from "../../utils/db";

export default function Main({
  mthds,
  objs,
  pmIcons,
  setpmIcons,
  pmState,
  setpmState,
  isPc,

  loggedIn,
  setlogStatus,
  signOut,
}) {
  const balance = useRef(false);
  const frozen = useRef(false);
  const spend = useRef(false);

  const [addpmState, setaddpmState] = useState(false);

  const [edit, setEdit] = useState({});
  /**This will contain the pm names */
  const [currentEntry, setCurrentEntry] = useState("");
  /**This will contain the values from the editable 'frozen, balance, spend etc.. */

  const [showsavebuttons, setshowbuttons] = useState(false);
  const pmcount = Object.keys(pmState).length - 1;

  function exportentryData() {
    const data = {};
    if (balance.current) {
      data.balance = mthds.toDigits(balance.current);
      balance.current = false;
    }
    if (frozen.current) {
      data.frozen = mthds.toDigits(frozen.current);
      frozen.current = false;
    }
    if (spend.current) {
      data.spend = mthds.toDigits(spend.current);
      spend.current = false;
    }
    return data;
  }

  const mainMobContent = (
    <div className="main-view-skin">
      {/* --------------------------------pm section ------------------------------ */}
      <div className="pm-box">
        <div className="div-with-name-and-count">
          {"Available Balances"}
          <div className="pmcount">{pmcount}</div>
        </div>

        <MidToolBar
          objs={objs}
          setState={setpmState}
          setEdit={setEdit}
          edit={edit}
          setaddpmS={setaddpmState}
          exportentryData={exportentryData}
          setshowbuttons={setshowbuttons}
          showsavebuttons={showsavebuttons}
          setCurrentEntry={setCurrentEntry}
          currentEntry={currentEntry}
          state={pmState}
        />

        <Entries
          isPc={isPc}
          setEdit={setEdit}
          edit={edit}
          balance={balance}
          frozen={frozen}
          spend={spend}
          state={pmState}
          activeEntry={currentEntry}
          showsavebuttons={showsavebuttons}
          setshowbuttons={setshowbuttons}
          setCurrentEntry={setCurrentEntry}
          icons={pmIcons}
          objs={objs.pmAmount.all}
          styleId="mid-entrybox"
        />
      </div>
    </div>
  );

  const mainContent = (
    <div className="main-view-skin">
      <h1> ...S⭐ P⭐ Y </h1>{" "}
      <div className="balance-container">
        <BalContainer
          amount={mthds.tidyFig(objs.pmAmount.netUsd)}
          currency="$"
          frozen={mthds.tidyFig(objs.pmAmount.netUsdF)}
          available={mthds.tidyFig(
            objs.pmAmount.netUsd - objs.pmAmount.netUsdF,
          )}
        />
        <BalContainer
          amount={mthds.tidyFig(objs.pmAmount.netNgn)}
          currency="₦"
          frozen={mthds.tidyFig(objs.pmAmount.netNgnF)}
          available={mthds.tidyFig(
            objs.pmAmount.netNgn - objs.pmAmount.netNgnF,
          )}
        />
      </div>
      {/*  progress Bar section*/}
      {/* ------------------------------------------------------- */}
      <div className="progress-total-all-container">
        <div className="progress-group">
          <div className="progress-box">
            <Progress {...objs.pmProgress.palmpay} />
            <Progress {...objs.pmProgress.opay} />
          </div>
        </div>

        {/* ---------mess of amounts- both currencies____________ */}
        <div className="total-bothcurrencies">
          <div className="mid-labels">Fx:</div>
          <div className="mid-values">{pmState.generalProps.rate}/$</div>
          <div className="mid-labels">USD: </div>
          <div className="mid-values">
            {mthds.tidyFig(
              objs.pmAmount.netUsd -
                objs.pmAmount.netUsdFee -
                objs.pmAmount.netUsdF,
            )}
          </div>
          <div className="mid-labels"> NGN: </div>
          <div className="mid-values">
            {mthds.tidyFig(objs.pmAmount.netNgn - objs.pmAmount.netNgnF)}
          </div>
        </div>

        {/* -------------------------------------------------------------------end------------------------------------------------- */}
      </div>
      {/* --------------------------------pm section ------------------------------ */}
      <div className="pm-box">
        {isPc ? (
          <div className="entry-title">Payment methods & Balances</div>
        ) : (
          <div className="div-with-name-and-count">
            {"Available Balances"}
            <div className="pmcount">{pmcount}</div>
          </div>
        )}
        <MidToolBar
          setState={setpmState}
          setEdit={setEdit}
          edit={edit}
          setaddpmS={setaddpmState}
          exportentryData={exportentryData}
          setshowbuttons={setshowbuttons}
          showsavebuttons={showsavebuttons}
          setCurrentEntry={setCurrentEntry}
          currentEntry={currentEntry}
          state={pmState}
        />
        <hr />
        {(() => {
          const arr = [
            <EntryHead key="entryhead" count={pmcount} />,
            <hr key="hr" />,
          ];
          return arr;
        })()}
        <Entries
          isPc={isPc}
          setEdit={setEdit}
          edit={edit}
          balance={balance}
          frozen={frozen}
          spend={spend}
          state={pmState}
          activeEntry={currentEntry}
          showsavebuttons={showsavebuttons}
          setshowbuttons={setshowbuttons}
          setCurrentEntry={setCurrentEntry}
          icons={pmIcons}
          objs={objs.pmAmount.all}
          styleId="mid-entrybox"
        />
      </div>
    </div>
  );

  return (
    <div className="main-view">
      {" "}
      <ReModal
        setState={setaddpmState}
        state={addpmState}
        content={isPc ? mainContent : mainMobContent}
        stageContent={
          <PMForm
            pmState={pmState}
            pmIcons={pmIcons}
            setpmIcons={setpmIcons}
            setpmState={setpmState}
          />
        }
      />{" "}
    </div>
  );
}
