import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Timer from "../utils/timer";
import Time from "../utils/time";
import TimerInput from './timerInput';
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
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})




function getTimeLeft(millis) {
  const time = Time.fromMillis(millis);

  const left = [
    ...time.hours,
    ...time.minutes,
    ...time.seconds,
  ]
    .filter(n => !!n)
    .join('');

  return left;
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

export default () => {
  const [percentageLeft, setPercentageLeft] = useState(100);
  const [timer, setTimer] = useState(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    return () => {
      if (timer) {
        timer.stop();
        setTimer(null);
        setText(null)
      }
    };
  }, [timer]);

  function onCancel() {
    setText(null)
    setTimer(null);
    setPercentageLeft(100);
  }

  function onTextChanged(inputText) {
    setText(inputText);
  }

  function startTimer() {
    const timer = Timer.from(text);

    timer.stop = timer.start(msRemaining => {
      setText(getTimeLeft(msRemaining));
      setPercentageLeft(msRemaining / timer.totalMs * 100)
    }, () => {
      setTimer(null);
      setPercentageLeft(0);
      playSound();
    });

    setTimer(timer);
  }

  function onSubmit() {
    if (!text || timer) {
      return;
    }

    startTimer();
  }

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
        <TimerInput
          disabled={!!timer}
          text={text}
          onSubmit={onSubmit}
          onTextChanged={onTextChanged}
        />
      </CircularProgressbarWithChildren>


      <div className={css(styles.buttonContainer)}>
        <button onClick={onCancel}>Cancel</button>
        <button primary="true" type="submit" onClick={onSubmit}> Start</button>
      </div>
    </div >
  );
};
