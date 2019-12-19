import React from "react";
import CountdownTimer from "./components/countdownTimer";
import Social from './components/social';

import "./index.css";

export default () => {
  return (
    <div className="App">
      <h1>Timer</h1>
      <CountdownTimer />
      <Social />
    </div>
  );
}