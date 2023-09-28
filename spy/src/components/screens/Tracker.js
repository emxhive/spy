import React from "react";
import "../../css/mobtracker.css";

import { Link } from "react-router-dom";

export default function Tracker({ trackState, settrackState }) {
  const pastData = [];
  const currentData = [];
  for (const key in trackState) {
    const data = trackState[key];
    const date = new Date(Number(key.replace("t", "")));
    currentData.push(
      <div className="mob-track-entry-box">
        {date.toLocaleDateString()}
        <div>{date.toLocaleTimeString()}</div>
        <div>{data.r}</div>
        <div>{data.u}</div>
        <div>{data.n}</div>
        <div>{data.iu}</div>
        <div>{data.in}</div>
        <div>{data.uf}</div>
        <div>{data.nf}</div>

        <div>{}</div>
      </div>
    );
  }
  const trackerContent = (
    <div className="mob-trackercontent">
      <div className="mob-trackrecords-past">
        Past
        {pastData}
      </div>
      <div className="mob-trackrecords-current">
        Present
        {currentData}
      </div>
    </div>
  );
  return trackerContent;
}
