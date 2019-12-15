export default class Timer {
  constructor(totalMs) {
    this.totalMs = totalMs;
  }

  remainingMs() {
    return this.endMs - Date.now();
  }

  start(onTick, onComplete) {
    this.endMs = Date.now() + this.totalMs;

    let active = true;
    const onFrame = () => {
      if (!active) {
        return;
      }

      const remainingMs = this.remainingMs();

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
}
