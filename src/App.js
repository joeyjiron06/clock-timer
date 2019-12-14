import React, { useState } from "react";
import TimerInput from "./components/timerInput";
import CountdownTimer from "./components/countdownTimer";
import RenderIf from "./components/renderIf";

import "./index.css";

export default () => {
  const [timer, setTimer] = useState(null);

  function onStart(timer) {
    console.log("onstart", timer);
    setTimer(timer);
  }

  function onCancel() {
    setTimer(null);
  }

  return (
    <div className="App">
      <h1>Timer</h1>
      {/* 
      <RenderIf condition={!timer}>
        <TimerInput onStart={onStart} />
      </RenderIf>

      <RenderIf condition={timer}> */}
      <CountdownTimer timer={timer} />
      {/* </RenderIf> */}
    </div>
  );
}