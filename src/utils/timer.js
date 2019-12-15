import Time from './time';

export default class Timer {
  constructor(totalMs) {
    this.totalMs = totalMs;
  }

  start(onTick, onComplete) {
    const endMs = Date.now() + this.totalMs;
    let active = true;
    function onFrame() {
      if (!active) {
        return;
      }

      const remainingMs = endMs - Date.now();

      if (remainingMs >= 0) {
        onTick(remainingMs);
        requestAnimationFrame(onFrame);
      }

      if (remainingMs <= 0) {
        onComplete();
      }
    }

    requestAnimationFrame(onFrame);

    return () => {
      active = false;
    };
  }

  static from(timeText) {
    const time = Time.fromText(timeText);

    let hours = time.hours.map(val => val || 0);
    let minutes = time.minutes.map(val => val || 0);
    let seconds = time.seconds.map(val => val || 0);

    hours = Number(hours[0] + hours[1]) * 60 * 60 * 1000;
    minutes = Number(minutes[0] + minutes[1]) * 60 * 1000;
    seconds = Number(seconds[0] + seconds[1]) * 1000;

    return new Timer(hours + minutes + seconds);
  }
}
