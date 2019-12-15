import React from "react";
import CountdownTimer from "./components/countdownTimer";

import "./index.css";

export default () => {
  return (
    <div className="App">
      <h1>Clock Timer</h1>
      <CountdownTimer />
    </div>
  );
}