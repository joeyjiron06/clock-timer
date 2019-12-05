import React, { Fragment } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';


const styles = StyleSheet.create({
  timerText: {
    fontSize: 60,
  },
  timerInputText: {
    position: 'absolute',
    top: 0,
    borderBottom: `solid 1px var(--color-grey)`
  },
  timerTextNumber: {
    opacity: 0.5
  },
  timerTextNumberFilled: {
    opacity: 1
  },
  timerTextUnit: {
    fontSize: 30,
    marginRight: 10
  }
});


const TimeTextGroup = ({ values, unit }) => (
  <Fragment>
    <span className={css(styles.timerTextNumber, values[0] !== null && styles.timerTextNumberFilled)}>
      {values[0] || '0'}
    </span>

    <span className={css(styles.timerTextNumber, values[1] !== null && styles.timerTextNumberFilled)}>
      {values[1] || '0'}
    </span>

    <span className={css(styles.timerTextNumber, values[1] !== null && styles.timerTextNumberFilled, styles.timerTextUnit)}>
      {unit}
    </span>
  </Fragment>

);

export default ({ time }) => (
  <div className={css(styles.timerText)}>
    <TimeTextGroup
      values={time.hours}
      unit='h'
    />
    <TimeTextGroup
      values={time.minutes}
      unit='m'
    />
    <TimeTextGroup
      values={time.seconds}
      unit='s'
    />
  </div>
);