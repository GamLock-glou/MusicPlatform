
export const getTimeFromPlayer = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const zero = seconds < 10 ? '0' : ''
  return `${minutes}:${zero}${seconds}`;
}