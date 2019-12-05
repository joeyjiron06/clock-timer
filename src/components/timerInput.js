import React, { useState } from "react";
import Timer from "../utils/timer";
import Time from './time';
import { StyleSheet, css } from 'aphrodite/no-important';


const styles = StyleSheet.create({
  timerInputContainer: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  borderBottom: {
    height: 1,
    width: '100%',
    backgroundColor: 'var(--color-grey)'
  },
  borderBottomFocused: {
    backgroundColor: 'var(--color-primary)'
  },
  timerInput: {
    position: 'absolute',
    opacity: 0,
    width: 280,
    height: 42,
    cursor: 'pointer'
  }
});

const maxLength = 6;

function padFront(string, maxLength, char) {
  const delta = maxLength - string.length;
  const filler = Array(delta).fill(char);
  return [
    ...filler,
    ...string
  ];
}

function getTime(rawNumberString) {
  const [h1, h2, m1, m2, s1, s2] = padFront(rawNumberString, 6, null);

  return {
    hours: [h1, h2],
    minutes: [m1, m2],
    seconds: [s1, s2]
  };
}

export default ({ onStart }) => {
  const [inputText, setInputText] = useState('');
  const [time, setTime] = useState(getTime(''));
  const [isFocused, setIsFocused] = useState(false);

  function onTextChange(event) {
    if (event.target.value.length > maxLength) {
      return;
    }

    if (event.target.value[0] === "0") {
      return;
    }

    if (event.target.value.includes("-")) {
      return;
    }

    setInputText(event.target.value);
    setTime(getTime(event.target.value));
  }

  function onFocus() {
    setIsFocused(true);
  }

  function onBlur() {
    setIsFocused(false);
  }

  return (
    <form
      className={css(styles.timerInputContainer)}
      onSubmit={event => {
        event.preventDefault();
        onStart(Timer.from(time));
      }}
    >
      <Time time={time} />

      <div className={css(styles.borderBottom, isFocused && styles.borderBottomFocused)}>
      </div>

      <input
        className={css(styles.timerInput)}
        type="number"
        onChange={onTextChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={inputText}
      />

      <button primary="true" type="submit">
        Start
      </button>
    </form>
  );
};
