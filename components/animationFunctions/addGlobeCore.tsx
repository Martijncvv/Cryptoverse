import { THREE } from "expo-three";
import { Asset } from "expo-asset";

export const addGlobeCore = (scene, radius: number) => {
  const globeGeometry = new THREE.SphereGeometry(radius, 24, 24);

  const texture = new THREE.TextureLoader().load(
    Asset.fromModule(require("../../assets/images/earth_lights_lrg.jpg")).uri,
  );

  let globeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    depthTest: true,
    depthWrite: false,
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  globe.rotation.x = 0.25;
  globe.name = "globe";
  scene.add(globe);
  return globe;
};
