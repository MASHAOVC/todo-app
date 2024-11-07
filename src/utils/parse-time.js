export function parseTime(timeInMs) {
  let min = 0;
  let sec = Math.round(timeInMs / 1000);

  while (sec >= 60) {
    sec -= 60;
    min += 1;
  }

  return { min, sec };
}
