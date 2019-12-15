import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Timer from "../utils/timer";
import { createTimeFromMs, textToMillis } from "../utils/time";
import TimerInput from './timerInput';
import { StyleSheet, css } from "aphrodite/no-important";

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    maxWidth: 400,
    margin: 'auto',
    padding: 20
  },
  circleProgressBar: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const maxLength = 6;


function getTimeLeft(millis) {
  const time = createTimeFromMs(millis);

  const left = [
    ...time.hours,
    ...time.minutes,
    ...time.seconds,
  ]
    .filter(n => !!n)
    .join('');

  return left;
}

const audio = new Audio();
audio.src = 'bell.mp3';

function playSound() {
  if (!audio.paused) {
    return;
  }

  audio.play();
}

// required for iOS devices. this is a workaround the restrictions that iOS puts on javascript
// more reading here https://medium.com/@curtisrobinson/how-to-auto-play-audio-in-safari-with-javascript-21d50b0a2765
function preloadSound() {
  if (audio.hasPreloaded) {
    return;
  }

  audio.play();
  audio.pause();
  audio.currentTime = 0;
  audio.hasPreloaded = true;
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

  function onTextChanged(event) {
    const inputText = event.target.value;

    if (inputText.length > maxLength) {
      return;
    }

    if (inputText[0] === "0") {
      return;
    }


    setText(inputText);
  }

  function startTimer() {
    const millis = textToMillis(text);
    const timer = new Timer(millis);

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

    preloadSound();
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
