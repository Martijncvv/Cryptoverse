import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";

global.THREE = global.THREE || THREE;

const SPHERE_RADIUS = 2;
const CAMERA_DISTANCE = 9;
const MAX_ITEM_DISTANCE_FACTOR = 0.7;
const STAR_COLOR = "#ffffff";

const starCoordinates = []; // Store x, y, z coordinates
const starPositions = []; // Store positions of stars for line creation

const DECIMALS = 6;

type FadeInViewProps = PropsWithChildren<{}>;

export const FadeInView: React.FC<FadeInViewProps> = () => {
  const [txs, setTxs] = useState([]);

  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<Renderer>();

  // This ref will help ensure that the scene is ready before adding stars
  const sceneReadyRef = useRef(false);

  const accountStarMap = {};
  const createdStar = new Set();

  const fetchTokenTxs = async () => {
    const res = await fetch(
      `https://api.basescan.org/api?module=account&action=tokentx&contractaddress=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&page=1&offset=30&startblock=0&endblock=99999999&sort=desc&apikey=WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, token txs, domain: info: ${res.status} ${res.statusText}`,
      );
      const GaiaSky = require("../assets/images/Gaia_EDR3_darkened.png");

      const geoWorld = require("../assets/constants/geoWorld.json");
    }
    let response = await res.json();
    console.log("response: ", response);
    setTxs((prev) => [...prev, ...response.result]);
  };

  useEffect(() => {
    fetchTokenTxs();
  }, []);

  useEffect(() => {
    if (sceneReadyRef.current && txs.length > 0) {
      createTxsStars();
    }
  }, [txs]);

  const createTxsStars = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    txs.forEach((tx: any, index) => {
      if (!(parseInt(tx.value) > 0)) {
        return;
      }
      const txValue = Math.floor(parseInt(tx.value) / 10 ** DECIMALS);
      const color = getColorByTxValue(txValue);

      const generateRandomCoordinate = (min, max, excludeMin, excludeMax) => {
        let value;
        do {
          value = Math.random() * (max - min) + min; // Generate a random value between min and max
        } while (value > -excludeMax && value < excludeMax); // Regenerate if within the excluded range
        return value;
      };

      const x = generateRandomCoordinate(
        -CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
        CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
        -SPHERE_RADIUS,
        SPHERE_RADIUS,
      );
      const y = generateRandomCoordinate(
        -CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
        CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
        -SPHERE_RADIUS,
        SPHERE_RADIUS,
      );
      const z = generateRandomCoordinate(
        -CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
        CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
        -SPHERE_RADIUS,
        SPHERE_RADIUS,
      );

      const coordinates = { x, y, z };
      addStar(scene, coordinates, color);
    });
  };

  const addStar = (scene, coordinates, color = STAR_COLOR) => {
    const startGeometry = new THREE.SphereGeometry(0.2, 15, 15);
    const starMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const texture = new THREE.TextureLoader().load(
      "../assets/images/coins/usdc-coin-logo.png",
    );
    let globeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const star = new THREE.Mesh(startGeometry, globeMaterial);
    star.position.set(coordinates.x, coordinates.y, coordinates.z);

    scene.add(star);
  };

  const addGlobeCore = (scene, radius: number) => {
    const globeGeometry = new THREE.SphereGeometry(radius, 24, 24);

    const texture = new THREE.TextureLoader().load(
      "../assets/images/earth_lights_lrg.jpg",
    );
    let globeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.rotation.x = 0.25;
    scene.add(globe);
  };

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const scene = new THREE.Scene();
    // scene.rotation.z = -1;
    scene.rotation.x = 0.3;
    sceneRef.current = scene; // Store the scene in the ref

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = CAMERA_DISTANCE;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    // renderer.setClearColor(BACKGROUND_COLOR, 1);
    rendererRef.current = renderer; // Store the renderer in the ref

    const texture = new THREE.TextureLoader().load(
      "../assets/images/Gaia_EDR3_darkened.png",
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    scene.background = texture;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.z = 15;
    scene.add(directionalLight);

    sceneReadyRef.current = true;

    addGlobeCore(scene, SPHERE_RADIUS);

    if (txs.length > 0) {
      createTxsStars();
    }

    // Animation function to render the scene
    const animate = () => {
      requestAnimationFrame(animate);

      // scene.rotation.z += 0.01;
      scene.rotation.y += 0.01;
      // scene.rotation.x += 0.01;

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

const getColorByTxValue = (txValue) => {
  // Base color components (e.g., light blue)
  const baseColor = { r: 255, g: 255, b: 255 };
  const maxColor = { r: 85, g: 114, b: 244 };

  // Set the range of txValue to map colors
  const maxValue = 1_00_000; // Maximum txValue to consider
  const minValue = 1_00; // Minimum txValue to consider

  // Clamp txValue between minValue and maxValue
  txValue = Math.max(minValue, Math.min(txValue, maxValue));

  // Calculate the interpolation factor (0 to 1)
  const factor = (txValue - minValue) / (maxValue - minValue);

  // Interpolate between baseColor and maxColor
  const interpolateColor = (start, end, factor) =>
    Math.round(start + (end - start) * factor);

  const r = interpolateColor(baseColor.r, maxColor.r, factor);
  const g = interpolateColor(baseColor.g, maxColor.g, factor);
  const b = interpolateColor(baseColor.b, maxColor.b, factor);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
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
