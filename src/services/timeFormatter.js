const formatDuration = (durationInMs, short) => {
  if (!durationInMs) return null;

  // Calculating Seconds
  let ms = durationInMs % 100;
  ms = ms.toString().padStart(2, '0');

  let sec = Math.floor(durationInMs / 1000) % 60;
  sec = sec.toString().padStart(2, '0');

  // Calculating Minutes
  let min = Math.floor(durationInMs / (1000 * 60)) % 60;
  min = min.toString().padStart(2, '0');

  // Calculating hours
  let hrs = Math.floor(durationInMs / (1000 * 60 * 60)) % 24;
  hrs = hrs.toString().padStart(2, '0');

  if (short) return `${min}:${sec}:${ms}`;
  return `${hrs}:${min}:${sec}:${ms}`;
};

export { formatDuration };
