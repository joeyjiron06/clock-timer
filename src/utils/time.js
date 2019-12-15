
function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

function padFront(string, maxLength, char) {
  const delta = maxLength - string.length;
  const filler = Array(delta).fill(char);
  return [
    ...filler,
    ...string
  ];
}

function trim(array) {
  if (array[0] === '0') {
    if (array[1] === '0') {
      return [
        null,
        null
      ]
    }

    return [
      null,
      array[1]
    ];
  }

  return array;
}

export default class Time {

  static fromText(text) {
    const [h1, h2, m1, m2, s1, s2] = padFront(text, 6, null);

    return {
      hours: [h1, h2],
      minutes: [m1, m2],
      seconds: [s1, s2],
    };
  }

  static fromMillis(millis) {
    let remain = millis;

    const hours = Math.floor(remain / (1000 * 60 * 60));
    remain = remain % (1000 * 60 * 60);

    const minutes = Math.floor(remain / (1000 * 60));
    remain = remain % (1000 * 60);

    const seconds = Math.floor(remain / 1000);
    remain = remain % 1000;

    return {
      hours: trim(pad(hours).split("")),
      minutes: trim(pad(minutes).split("")),
      seconds: trim(pad(seconds).split(""))
    };
  }

  static toMillis(text) {
    const time = Time.fromText(text);

    let hours = time.hours.map(val => val || 0);
    let minutes = time.minutes.map(val => val || 0);
    let seconds = time.seconds.map(val => val || 0);

    hours = Number(hours[0] + hours[1]) * 60 * 60 * 1000;
    minutes = Number(minutes[0] + minutes[1]) * 60 * 1000;
    seconds = Number(seconds[0] + seconds[1]) * 1000;

    return hours + minutes + seconds;
  }
}