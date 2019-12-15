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
}
