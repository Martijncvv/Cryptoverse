import React, { PropsWithChildren } from "react";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import { WORLD_GEO_COORDINATES } from "@/assets/constants/geoCoordinates";

const geoWorld = require("../assets/constants/geoWorld.json");

global.THREE = global.THREE || THREE;

const SPHERE_RADIUS = 3;
const NR_START_BY_COUNTRY = 10;
const DARK_BLUE = "#181d3a";
const BASE_BLUE = "#6f87ff";
const GLOBE_COLOR = "#104d81";
const STAR_COLOR = "#ffffff";
const BACKGROUND_COLOR = "#000000";
const starCoordinates = []; // Store x, y, z coordinates
const starPositions = []; // Store positions of stars for line creation

type FadeInViewProps = PropsWithChildren<{}>;

export const FadeInView: React.FC<FadeInViewProps> = () => {
  console.log("geoWorld: ", geoWorld);

  const fetchTokenTxs = async () => {
    const res = await fetch(
      `https://api.basescan.org/api?module=account&action=tokentx&contractaddress=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&page=1&offset=30&startblock=0&endblock=99999999&sort=desc&apikey=WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, token txs, domain: info: ${res.status} ${res.statusText}`,
      );
    }
    let response = await res.json();
  };

  const addStar = (scene) => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array.from({ length: 3 }, () =>
      THREE.MathUtils.randFloatSpread(30),
    );
    // console.log(`addStar, x: ${x} y: ${y} z: ${z}`);
    star.position.set(x, y, z);
    scene.add(star);
    starCoordinates.push({ x, y, z });
    starPositions.push(star.position);
  };

  const addGlobeCore = (scene, radius: number) => {
    const globeGeometry = new THREE.SphereGeometry(radius - 0.01, 45, 45);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(GLOBE_COLOR),
      transparent: true,
      opacity: 0.9,
      // blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);

    scene.add(globe);
  };

  const createGlobeDots = (scene) => {
    const starGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(STAR_COLOR),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    WORLD_GEO_COORDINATES.forEach((coordinates, index) => {
      if (index % 2 === 0) {
        if (coordinates.x && coordinates.y && coordinates.z) {
          const star = new THREE.Mesh(starGeometry, starMaterial);
          star.position.set(coordinates.x, coordinates.y, coordinates.z);
          scene.add(star);
        }
      }
    });
  };

  const createLinesBetweenStars = (scene) => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.5,
    });

    const positions = [];
    // Create lines between each pair of stars
    for (let i = 0; i < starPositions.length; i++) {
      for (let j = i + 1; j < starPositions.length; j++) {
        // Only draw lines between stars that are close to each other
        const distance = starPositions[i].distanceTo(starPositions[j]);
        if (distance < 2) {
          // Adjust distance threshold as needed
          positions.push(
            starPositions[i].x,
            starPositions[i].y,
            starPositions[i].z,
            starPositions[j].x,
            starPositions[j].y,
            starPositions[j].z,
          );
        }
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    const lineMesh = new THREE.LineSegments(geometry, material);
    scene.add(lineMesh);
  };

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(BACKGROUND_COLOR, 1);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(0, 0, 7); // Position the light at an angle
    // scene.add(directionalLight);
    // const axesHelper = new THREE.AxesHelper(5); // The parameter is the size of the axes
    // scene.add(axesHelper);

    // Add Ambient Light with lower intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    createGlobeDots(scene);
    addGlobeCore(scene, SPHERE_RADIUS);

    // Animation function to render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      // camera.rotation.y += 0.01;
      scene.rotation.y += 0.003;
      scene.rotation.x += 0.003;
      // scene.rotation.x += 0.003;
      // scene.rotation.x = 5;

      renderer.render(scene, camera);

      // Notify the GLView that it needs to update
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <GLView
      style={{ width: "100%", height: "100%" }}
      onContextCreate={onContextCreate}
    />
  );
};

const calculateSphereStar = (scene, radius) => {
  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;
  const NR_START_BY_COUNTRY = 10;
  const geometry = new THREE.SphereGeometry(0.03, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: "white" });

  geoWorld.features.forEach((feature) => {
    const nrOfCoordinates = feature.geometry.coordinates[0].length;

    const step = Math.ceil(nrOfCoordinates / NR_START_BY_COUNTRY);
    feature.geometry.coordinates[0].forEach((coordinates, index) => {
      if (index % step === 0) {
        const star = new THREE.Mesh(geometry, material);

        // Extract longitude and latitude from coordinates
        const longitude = coordinates[0]; // Assuming coordinates[0] is longitude
        const latitude = coordinates[1]; // Assuming coordinates[1] is latitude

        // Convert degrees to radians
        const phi = degreesToRadians(latitude);
        const theta = degreesToRadians(longitude);

        // Convert spherical coordinates to Cartesian coordinates
        const x = radius * Math.cos(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi) * Math.sin(theta);
        const z = radius * Math.sin(phi);

        star.position.set(x, y, z);
        scene.add(star);

        starPositions.push({ x, y, z });
      }
    });
  });
};
