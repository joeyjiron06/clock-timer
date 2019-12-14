import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Timer from "../utils/timer";
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

function getTimeLeft(millis) {
  const time = getTime(millis);

  const left = [
    ...time.hours,
    ...time.minutes,
    ...time.seconds,
  ]
    .filter(n => !!n)
    .join('');

  // console.log(left);

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
        setPercentageLeft(100);
      }
    };
  }, [timer]);

  function onCancel() {
    setTimer(null);
  }

  function onTextChanged(inputText) {
    setText(inputText);
  }

  function onSubmit() {
    const timer = Timer.from(text);

    timer.stop = timer.start(msRemaining => {
      setText(getTimeLeft(msRemaining));
      setPercentageLeft(msRemaining / timer.totalMs * 100)

      if (msRemaining <= 0) {
        playSound();
      }
    });

    setTimer(timer);
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
          text={text}
          onSubmit={onSubmit}
          onTextChanged={onTextChanged}
        />
      </CircularProgressbarWithChildren>


      <div className={css(styles.buttonContainer)}>
        <button onClick={onCancel}>Cancel</button>
        <button primary="true" type="submit" onClick={() => {
          onSubmit(text);
        }}> Start</button>
      </div>
    </div >
  );
};
