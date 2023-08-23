import React from "react";
import { GrFormClose } from "react-icons/gr";
import "../css/remodal.css";
/**
 *
 * @param {stageContent, content are super important... same for the rest though} param0
 * @returns
 */
export default function ReModal({ state, setState, content, stageContent }) {
  return (
    <div className="mx-remodal">
      {state && (
        <div  >
          <div className="blur" onClick={() => setState(false)}></div>
          <div className="stage">
            
            <div className="stage-container">{stageContent}</div>
          </div>
        </div>
      )}
      {content}
    </div>
  );
}
