import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Time from "./time";
import { StyleSheet, css } from "aphrodite/no-important";

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    maxWidth: 400,
    margin: 'auto'
  },
  circleProgressBar: {
    width: '100%',
  }
})

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
  const [percentageLeft, setPercentageLeft] = useState(100);

  useEffect(() => {
    const stop = timer.start(msRemaining => {
      const time = getTime(msRemaining);

      setTime(time);
      setPercentageLeft(msRemaining / timer.totalMs * 100)

      if (msRemaining === 0) {
        playSound();
      }
    });

    return () => {
      stop();
    };
  }, [timer]);

  return (
    <div className={css(styles.root)}>
      <CircularProgressbarWithChildren
        classes={{
          root: css(styles.circleProgressBar)
        }}
        value={percentageLeft}
        strokeWidth={4}
        styles={buildStyles({
          strokeLinecap: 'round',
          pathColor: 'var(--color-primary)',
          trailColor: 'var(--color-grey)'
        })}
      >
        <Time time={time} />
      </CircularProgressbarWithChildren>

      <button onClick={onCancel} primary='true'>Cancel</button>
    </div >
  );
};
