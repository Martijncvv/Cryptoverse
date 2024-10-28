import { THREE } from "expo-three";

export const addArrow = (scene, height: number, color: string = "white") => {
  // Arrow Shaft (short and wide for an iconic look)
  const shaftHeight = height * 0.5; // Make the shaft shorter
  const shaftRadius = height * 0.15; // Increase the radius for width
  const shaftGeometry = new THREE.CylinderGeometry(
    shaftRadius,
    shaftRadius,
    shaftHeight,
    32,
  );
  const shaftMaterial = new THREE.MeshBasicMaterial({ color });
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);

  // Position the shaft vertically
  shaft.position.y = -shaftHeight / 2;

  // Arrowhead (proportionately larger for an iconic look)
  const headHeight = height * 0.5; // Larger head height relative to shaft
  const headRadius = shaftRadius * 2; // Head is wider than shaft for emphasis
  const headGeometry = new THREE.ConeGeometry(headRadius, headHeight, 32);
  const headMaterial = new THREE.MeshBasicMaterial({ color });
  const head = new THREE.Mesh(headGeometry, headMaterial);

  // Position the head at the top of the shaft
  head.position.y = headHeight / 2;

  // Green Sphere (semi-transparent)
  const sphereRadius = height / 1.9; // Slightly larger than arrow height
  const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: "green",
    transparent: true,
    opacity: 0.3, // Semi-transparent to see the arrow inside
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // Create an empty group and add shaft, head, and sphere
  const arrowGroup = new THREE.Group();
  arrowGroup.add(shaft);
  arrowGroup.add(head);
  arrowGroup.add(sphere);

  // Position the sphere to enclose the arrow
  sphere.position.set(0, 0, 0);

  // Add to the scene
  scene.add(arrowGroup);
  return arrowGroup;
};
