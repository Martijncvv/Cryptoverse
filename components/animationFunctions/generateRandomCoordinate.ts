export const generateRandomCoordinate = (min, max) => {
  return Math.random() * (max - min) + min; // Generate a random value between min and max
};
