export const getStarSpeedByTxValue = (txValue) => {
  const minSpeed = 0.001; // Minimum speed for stars with high txValue
  const maxSpeed = 0.004; // Maximum speed for stars with low txValue

  // Set the range of txValue to map speed
  const maxValue = 1_000_000; // Maximum txValue to consider
  const minValue = 100; // Minimum txValue to consider

  // Clamp txValue between minValue and maxValue
  txValue = Math.max(minValue, Math.min(txValue, maxValue));

  // Calculate the inverted factor (1 to 0)
  const factor = 1 - (txValue - minValue) / (maxValue - minValue);

  // Calculate speed based on inverted factor
  return minSpeed + (maxSpeed - minSpeed) * factor;
};
