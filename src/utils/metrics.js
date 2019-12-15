/* global gtag */

export function timerStarted(millis) {
  if (!gtag) {
    return;
  }


  gtag('event', 'start', {
    event_category: 'timer',
    value: millis
  });
}

export function timerCancelled(timeLeft) {
  if (!gtag) {
    return;
  }

  gtag('event', 'cancel', {
    event_category: 'timer',
    value: timeLeft
  });
}

export function timerFinished(millis) {
  if (!gtag) {
    return;
  }

  gtag('event', 'finished', {
    event_category: 'timer',
    value: millis
  });
}