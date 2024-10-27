import { Color } from "three";

import { getStarRadiusByTxValue } from "@/components/animationFunctions/getStarRadiusByTxValue";
import { getColorByTxValue } from "@/components/animationFunctions/getColorByTxValue";
import { THREE } from "expo-three";
import FakeGlowMaterial from "@/components/animationFunctions/FakeGlowMaterial";

const DECIMALS = 6;

export const addStar = (scene, coordinates, tx) => {
  const txValue = Math.floor((parseInt(tx.value) / 10 ** DECIMALS) * 100) / 100;
  const color = getColorByTxValue(txValue);
  const radius = getStarRadiusByTxValue(txValue); // Use radius based on txValue

  const startGeometry = new THREE.SphereGeometry(radius, 15, 15);
  const glowColor = new Color(color);

  const starMaterial = FakeGlowMaterial({
    glowColor,
    glowInternalRadius: 10,
    glowSharpness: 0.3,
    falloff: 0.2,
  });

  const star = new THREE.Mesh(startGeometry, starMaterial);
  star.position.set(coordinates.x, coordinates.y, coordinates.z);
  star.userData = { ...tx };
  star.userData.txValue = txValue;

  scene.add(star);

  return star;
};
