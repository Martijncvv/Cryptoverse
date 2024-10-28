export const DISTANCE_RANGES = [
  { minDistanceFactor: 1, range: [100, 5000] }, // Young
  { minDistanceFactor: 1.5, range: [5000, 20000] }, // Young-Mid
  { minDistanceFactor: 2, range: [20000, 50000] }, // Middle-Aged
  { minDistanceFactor: 3, range: [50000, 100000] }, // Older
  { minDistanceFactor: 3.5, range: [100000, 1000000] }, // Aging
  { minDistanceFactor: 4.5, range: [1000000, Infinity] }, // Old
];

export const getMinStarDistanceByTxValue = (txValue, SPHERE_RADIUS) => {
  const { minDistanceFactor } =
    DISTANCE_RANGES.find(
      ({ range: [min, max] }) => txValue >= min && txValue < max,
    ) || DISTANCE_RANGES[0]; // Default to first range if no match

  // Randomize distance if minDistanceFactor is 1, otherwise use calculated factor
  const factor =
    minDistanceFactor === 1
      ? Math.random() * (5.5 - 1.5) + 1.5
      : minDistanceFactor;

  return SPHERE_RADIUS * factor;
};
