export default class Timer {
  constructor(totalMs) {
    this.totalMs = totalMs;
  }

  start(onTick) {
    const endMs = Date.now() + this.totalMs;
    let active = true;
    function onFrame() {
      if (!active) {
        return;
      }

      const rawRemainingMs = endMs - Date.now();
      const remainingMs = Math.floor(rawRemainingMs / 1000) * 1000;

      if (remainingMs >= 0) {
        onTick(remainingMs);
        requestAnimationFrame(onFrame);
      }
    }

    requestAnimationFrame(onFrame);

    return () => {
      active = false;
    };
  }

  static from(time) {
    let hours = time.hours.map(val => val || 0);
    let minutes = time.minutes.map(val => val || 0);
    let seconds = time.seconds.map(val => val || 0);

    hours = Number(hours[0] + hours[1]) * 60 * 60 * 1000;
    minutes = Number(minutes[0] + minutes[1]) * 60 * 1000;
    seconds = Number(seconds[0] + seconds[1]) * 1000;
    return new Timer(hours + minutes + seconds);
  }
}
