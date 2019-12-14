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


export default ({ onSubmit, text, onTextChanged }) => {
  // const [inputText, setInputText] = useState('');
  // const [time, setTime] = useState(Timer.getTime(''));
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

    // setInputText(event.target.value);
    // setTime(Timer.getTime(event.target.value));
    onTextChanged(event.target.value);
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
        onSubmit();
      }}
    >
      <Time time={Timer.getTime(text || '')} />

      <div className={css(styles.borderBottom, isFocused && styles.borderBottomFocused)}>
      </div>

      <input
        className={css(styles.timerInput)}
        type="number"
        onChange={onTextChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={text || ''}
      />
    </form>
  );
};
