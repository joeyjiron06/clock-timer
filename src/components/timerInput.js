import React, { useState } from "react";
import { createTimeFromText } from "../utils/time";
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

const ALLOWED_KEYS = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Enter'
]);


export default ({ onSubmit, text, onTextChanged, disabled }) => {
  const [isFocused, setIsFocused] = useState(false);


  function onKeyPress(event) {
    console.log('event.key', event.key);
    if (!ALLOWED_KEYS.has(event.key)) {
      event.preventDefault();
    }
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
      <Time time={createTimeFromText(text || '')} />

      <div className={css(styles.borderBottom, isFocused && styles.borderBottomFocused)}>
      </div>

      <input
        className={css(styles.timerInput)}
        type="number"
        disabled={disabled}
        onChange={onTextChanged}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        value={text || ''}
      />
    </form>
  );
};
