// moveStars.js

import { getMinStarDistanceByTxValue } from "@/components/animationFunctions/getMinStarDistanceByTxValue";
import { getStarSpeedByTxValue } from "@/components/animationFunctions/getStarSpeedByTxValue";

export const moveStars = ({ starsRef, sceneRef, SPHERE_RADIUS }) => {
  starsRef.current.forEach((star) => {
    // Calculate distance to Earth (origin)
    const distance = Math.sqrt(
      star.position.x ** 2 + star.position.y ** 2 + star.position.z ** 2,
    );

    const starBaseSpeed = getStarSpeedByTxValue(star.userData.txValue);
    const minStarDistance = getMinStarDistanceByTxValue(
      star.userData.txValue,
      SPHERE_RADIUS,
    );

    if (distance > minStarDistance) {
      // Phase 1: Move towards Earth
      star.position.x -= star.position.x * starBaseSpeed;
      star.position.y -= star.position.y * starBaseSpeed;
      star.position.z -= star.position.z * starBaseSpeed;
    } else {
      // Convert Cartesian coordinates to polar coordinates for orbit
      const radius = Math.sqrt(star.position.x ** 2 + star.position.y ** 2);
      const angle = Math.atan2(star.position.y, star.position.x);

      const orbitSpeed = starBaseSpeed * 2;

      // Update the angle for a half-orbit
      const newAngle = angle + starBaseSpeed;

      // Convert back to Cartesian coordinates
      star.position.x = radius * Math.cos(newAngle);
      star.position.y = radius * Math.sin(newAngle);

      // Move in z-axis to achieve half-orbit effect
      star.position.z += orbitSpeed * 20;

      // Phase 3: Make the star disappear after half the orbit
      if (newAngle > Math.PI * 0.8) {
        star.material.opacity -= 0.01; // Gradually reduce opacity

        // Remove star when fully transparent
        if (star.material.opacity <= 0) {
          sceneRef.current.remove(star);
          starsRef.current = starsRef.current.filter((s) => s !== star);
        }
      }
    }
  });
};
