export const COLOR_RANGES = [
  { color: "#ffffff", label: "$100+", range: [100, 5000] },
  { color: "#75cc78", label: "$5k+", range: [5000, 20000] },
  { color: "#1468e1", label: "20k+", range: [20000, 50_000] },
  { color: "#ffd700", label: "50k+", range: [50_000, 100_000] },
  { color: "#ff8c00", label: "100k+", range: [100_000, 300_000] },
  { color: "#ff4500", label: "300k+", range: [300_000, 1000_000] },
  { color: "#8b0000", label: "1M+", range: [1000_000, 3000_000] },
  { color: "#7c32e4", label: "3M+", range: [3000_000, 5000_000] },
  { color: "#cd1eff", label: "5M+", range: [5000_000, Infinity] },
];
export const getColorByTxValue = (txValue) => {
  // Loop through COLOR_RANGES and return the color for the matching range
  for (const range of COLOR_RANGES) {
    const [min, max] = range.range;
    if (txValue >= min && txValue < max) {
      return range.color;
    }
  }

  // Default to the first color if no range matches (though ideally, this won't happen)
  return COLOR_RANGES[0].color;
};
