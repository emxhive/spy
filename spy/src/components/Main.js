import Entries from "../components/Entries";
import EntryHead from "../components/EntryHead";
import ToolBar from "../components/ToolBar";
import BalContainer from "../components/BalContainer";
import Progress from "../components/Progress";

export default function Main({ mthds, objs, pmState, setpmState }) {
  return (
    <div className="main-content">
      <h1> ...S⭐ P⭐ Y </h1>{" "}
      <div className="balance-container">
        <BalContainer
          amount={mthds.tidyFig(objs.pmAmount.netUsd)}
          currency="$"
          frozen={mthds.tidyFig(objs.pmAmount.netUsdF)}
          available={mthds.tidyFig(
            objs.pmAmount.netUsd - objs.pmAmount.netUsdF
          )}
        />
        <BalContainer
          amount={mthds.tidyFig(objs.pmAmount.netNgn)}
          currency="₦"
          frozen={mthds.tidyFig(objs.pmAmount.netNgnF)}
          available={mthds.tidyFig(
            objs.pmAmount.netNgn - objs.pmAmount.netNgnF
          )}
        />
      </div>
      {/* progress Bar section*/}
      {/* ------------------------------------------------------- */}
      <div className="mid-section">
        <div className="progress-group">
          <div className="progress-box">
            <Progress {...objs.pmProgress.palmpay} />
            <Progress {...objs.pmProgress.opay} />
          </div>

          <div className="remainder-box">
            <div>
              {" "}
              {objs.symbols.ngn + objs.pmAmount.ngn.palmpay1.leftoverStr}
            </div>
            <div> {objs.symbols.ngn + objs.pmAmount.ngn.opay.leftoverStr}</div>
          </div>
        </div>

        {/* --------------------------------mess of amounts- both currencies____________ */}
        <div className="total-bothcurrencies">
          <div className="mid-labels">active</div>
          <div className="mid-labels"> frozen</div>
          <div className="mid-labels">total</div>
          <div className="mid-main-value">
            {`(${objs.symbols.usd}) `}
            {mthds.tidyFig(objs.pmAmount.netInUsd - objs.pmAmount.netInUsdF)}
          </div>
          <div className="mid-minor-value">
            {mthds.tidyFig(objs.pmAmount.netInUsdF)}
          </div>
          <div className="mid-minor-value">
            {mthds.tidyFig(objs.pmAmount.netInUsd)}
          </div>
          <div className="mid-main-value">
            {`(${objs.symbols.ngn}) `}

            {mthds.tidyFig(objs.pmAmount.netInNgn - objs.pmAmount.netInNgnF)}
          </div>
          <div className="mid-minor-value">
            {mthds.tidyFig(objs.pmAmount.netInNgnF)}
          </div>
          <div className="mid-minor-value">
            {mthds.tidyFig(objs.pmAmount.netInNgn)}
          </div>
        </div>

        {/* -------------------------------------------------------------------end------------------------------------------------- */}
      </div>
      {/* --------------------------------pm section ------------------------------------ */}
      <div className="pm-box">
        <div className="entry-title">Payment methods & Balances</div>
        <ToolBar />
        <hr />
        <EntryHead />
        <hr />
        <Entries
          state={pmState}
          setpmState={setpmState}
          objs={objs.midEntryPm}
          styleId="mid-entrybox"
        />
      </div>
    </div>
  );
}
