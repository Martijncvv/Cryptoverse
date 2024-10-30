export const getStarSpeedByTxValue = (txValue: number) => {
  let baseSpeed = 0.003;

  if (txValue < 100) {
    return baseSpeed * 1.5;
  }
  if (txValue < 5000) {
    return baseSpeed * 1.2;
  }
  return baseSpeed;
};
