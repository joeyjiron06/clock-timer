import React, { useState, useEffect } from "react";
import Time from "./time";

function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

function getTime(milliseconds) {
  let remain = milliseconds;

  const hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);

  const minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);

  const seconds = Math.floor(remain / 1000);
  remain = remain % 1000;

  return {
    hours: pad(hours).split(""),
    minutes: pad(minutes).split(""),
    seconds: pad(seconds).split("")
  };
}

let isPlayingSound = false;
function playSound() {
  if (isPlayingSound) {
    return;
  }

  const audio = new Audio();
  audio.src = 'bell.mp3';
  audio.onended = () => {
    isPlayingSound = false;
  };
  isPlayingSound = true;
  audio.play();
}

export default ({ timer, onCancel }) => {
  const [time, setTime] = useState(getTime(0));

  useEffect(() => {
    const stop = timer.start(msRemaining => {
      const time = getTime(msRemaining);
      setTime(time);

      if (msRemaining === 0) {
        playSound();
      }
    });

    return () => {
      stop();
    };
  }, [timer]);

  return (
    <div className="countdownTimer">
      <div className="countdownCircle">
        <div className="countdownCircleBackground" />
        <div className="countdownCirclePercentage" />
      </div>

      <Time time={time} />
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
