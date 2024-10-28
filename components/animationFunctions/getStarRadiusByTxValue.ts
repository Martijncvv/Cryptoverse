export const getStarRadiusByTxValue = (txValue) => {
  // Define radius values for each range step
  const radii = [10, 20, 40, 60, 80, 90, 110]; // Corresponding to low to high txValue

  // Define range thresholds for each radius step
  const steps = [100, 5000, 20000, 50000, 100_000, 300_000, 1000000];

  // If txValue is above the last threshold, return the maximum radius directly
  if (txValue >= steps[steps.length - 1]) {
    return radii[radii.length - 1];
  }

  // Determine the radius based on the txValue range
  for (let i = 0; i < steps.length - 1; i++) {
    if (txValue >= steps[i] && txValue < steps[i + 1]) {
      return radii[i];
    }
  }

  // Default to the minimum radius if somehow the range is not matched
  return radii[0];
};
