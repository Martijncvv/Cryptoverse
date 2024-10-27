import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import { Linking, PanResponder, Platform } from "react-native";

global.THREE = global.THREE || THREE;

const SPHERE_RADIUS = 150;
const MIN_STAR_START_DISTANCE = 1000;
const STAR_RADIUS = 10;
const CAMERA_DISTANCE = 1000;

const STAR_COLOR = "#ffffff";

const starCoordinates = []; // Store x, y, z coordinates
const starPositions = []; // Store positions of stars for line creation

const DECIMALS = 6;

type FadeInViewProps = PropsWithChildren<{}>;

export const FadeInView: React.FC<FadeInViewProps> = () => {
  const [txs, setTxs] = useState([]);
  const [lastHoveredItem, setLastHoveredItem] = useState();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const starsRef = useRef([]);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<Renderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  // This ref will help ensure that the scene is ready before adding stars
  const sceneReadyRef = useRef(false);
  const spherical = useRef(
    new THREE.Spherical(CAMERA_DISTANCE, Math.PI / 2, 0),
  );

  // Variables to track mouse state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const accountStarMap = {};
  const createdStar = new Set();

  const fetchTokenTxs = async () => {
    if (txs.length > 0) {
      return null;
    }
    const res = await fetch(
      `https://api.basescan.org/api?module=account&action=tokentx&contractaddress=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&page=1&offset=200&startblock=0&endblock=99999999&sort=desc&apikey=WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, token txs, domain: info: ${res.status} ${res.statusText}`,
      );
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

  const generateRandomCoordinate = (min, max) => {
    return Math.random() * (max - min) + min; // Generate a random value between min and max
  };

  const createTxsStars = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    const newStars = [];
    txs.forEach((tx: any, index) => {
      if (!(parseInt(tx.value) > 0)) {
        return;
      }

      let x = generateRandomCoordinate(-1000, 1000);
      let y = generateRandomCoordinate(-1000, 1000);
      let z = generateRandomCoordinate(-1000, 1000);

      // Check if all values are within the restricted range
      if (
        Math.abs(x) <= MIN_STAR_START_DISTANCE &&
        Math.abs(y) <= MIN_STAR_START_DISTANCE &&
        Math.abs(z) <= MIN_STAR_START_DISTANCE
      ) {
        // Force one of the values to be outside the range
        const axisToChange = Math.floor(Math.random() * 3); // Randomly pick one of x, y, z
        switch (axisToChange) {
          case 0: // Modify x
            x =
              x < 0
                ? -MIN_STAR_START_DISTANCE - 1
                : MIN_STAR_START_DISTANCE + 1;
            break;
          case 1: // Modify y
            y =
              y < 0
                ? -MIN_STAR_START_DISTANCE - 1
                : MIN_STAR_START_DISTANCE + 1;
            break;
          case 2: // Modify z
            z =
              z < 0
                ? -MIN_STAR_START_DISTANCE - 1
                : MIN_STAR_START_DISTANCE + 1;
            break;
          default:
            break;
        }
      }

      const coordinates = { x, y, z };
      const newStar = addStar(scene, coordinates, tx);
      // console.log("newStar: ", newStar);
      newStars.push(newStar);
    });
    // console.log("newStars: ", newStars);
    starsRef.current = newStars;
  };

  const addStar = (scene, coordinates, tx) => {
    const txValue = Math.floor(parseInt(tx.value) / 10 ** DECIMALS);
    const color = getColorByTxValue(txValue);

    const startGeometry = new THREE.SphereGeometry(STAR_RADIUS, 15, 15);
    const starMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const texture = new THREE.TextureLoader().load(
      "../assets/images/coins/usdc-coin-logo.png",
    );

    const star = new THREE.Mesh(startGeometry, starMaterial);
    star.userData = { ...tx };
    star.userData.txValue = txValue;
    star.position.set(coordinates.x, coordinates.y, coordinates.z);

    scene.add(star);
    return star;
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
    globe.name = "globe";
    scene.add(globe);
    return globe;
  };

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const scene = new THREE.Scene();
    sceneRef.current = scene; // Store the scene in the ref

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2001);
    camera.position.z = CAMERA_DISTANCE;
    cameraRef.current = camera;

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

    const globe = addGlobeCore(scene, SPHERE_RADIUS);

    if (txs.length > 0) {
      createTxsStars();
    }

    // Animation function to render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.003;
      cameraRef.current = camera;

      // Update raycaster with pointer and camera positions
      raycaster.setFromCamera(pointer, camera);

      moveStars();

      renderer.render(scene, camera);

      // Notify the GLView that it needs to update
      gl.endFrameEXP();
    };

    animate();
  };

  const moveStars = () => {
    starsRef.current.forEach((star) => {
      // Calculate distance to Earth (origin)
      const distance = Math.sqrt(
        star.position.x ** 2 + star.position.y ** 2 + star.position.z ** 2,
      );

      const STAR_SPEED = 0.003;

      const minStarDistance = SPHERE_RADIUS * 4;

      if (distance > SPHERE_RADIUS) {
        // Phase 1: Move towards Earth
        star.position.x -= star.position.x * STAR_SPEED;
        star.position.y -= star.position.y * STAR_SPEED;
        star.position.z -= star.position.z * STAR_SPEED;
      } else {
        // Convert Cartesian coordinates to polar coordinates for orbit
        const radius = Math.sqrt(star.position.x ** 2 + star.position.y ** 2);
        const angle = Math.atan2(star.position.y, star.position.x);

        const orbitSpeed = STAR_SPEED * 2;

        // UpdatSTAR_SPEEDe the angle for a half-orbit
        const newAngle = angle + STAR_SPEED;

        // Convert back to Cartesian coordinates
        star.position.x = radius * Math.cos(newAngle);
        star.position.y = radius * Math.sin(newAngle);

        // Move in z-axis to achieve half-orbit effect
        star.position.z += orbitSpeed * 20;

        // Phase 3: Make the star disappear after half the orbit
        if (newAngle > Math.PI) {
          sceneRef.current.remove(star);
          starsRef.current = starsRef.current.filter((s) => s !== star);
        }
      }
    });
  };

  const handlePress = (x, y, width, height) => {
    console.log("GM");
    pointer.x = (x / width) * 2 - 1;
    pointer.y = -(y / height) * 2 + 1;
    raycaster.setFromCamera(pointer, cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children);

    if (intersects.length > 0) {
      if (sceneRef.current && cameraRef.current) {
        const clickedItem = intersects[0]?.object || null;

        const txHash = clickedItem?.userData?.hash;
        if (txHash) {
          const url = `https://basescan.org/tx/${txHash}`;
          if (Platform.OS === "web") {
            // Open in a new tab on web without navigating away
            window.open(url, "_blank", "noreferrer");
          } else {
            // Use Linking for mobile (note: may bring the user to the browser)
            Linking.openURL(url).catch((err) =>
              console.error("Failed to open URL:", err),
            );
          }
        }

        clickedItem?.material?.color.set(0xff0000);
      }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        handlePanMove(gestureState);
      },
      onPanResponderRelease: (event, gestureState) => {
        handlePress(
          gestureState.moveX,
          gestureState.moveY,
          gestureState.width,
          gestureState.height,
        );
      },
    }),
  ).current;

  const handlePanMove = (gestureState) => {
    if (!cameraRef.current) return;

    const rotationSpeed = 0.005;

    // Update spherical coordinates for rotation
    spherical.current.theta -= gestureState.dx * rotationSpeed;
    spherical.current.phi -= gestureState.dy * rotationSpeed;

    // Clamp phi to prevent the camera from flipping over the poles
    spherical.current.phi = Math.max(
      0.1,
      Math.min(Math.PI - 0.1, spherical.current.phi),
    );

    // Update camera position based on spherical coordinates
    const { radius, theta, phi } = spherical.current;
    cameraRef.current.position.setFromSphericalCoords(radius, phi, theta);

    // Keep the camera focused on the center of the scene
    cameraRef.current.lookAt(0, 0, 0);
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current || !cameraRef.current) return;

    const rotationSpeed = 0.005;

    // Calculate mouse movement delta
    const deltaX = event.clientX - previousMousePosition.current.x;
    const deltaY = event.clientY - previousMousePosition.current.y;

    // Update spherical coordinates for rotation
    spherical.current.theta -= deltaX * rotationSpeed;
    spherical.current.phi -= deltaY * rotationSpeed;

    // Clamp phi to prevent the camera from flipping over the poles
    spherical.current.phi = Math.max(
      0.1,
      Math.min(Math.PI - 0.1, spherical.current.phi),
    );

    // Update camera position based on spherical coordinates
    const { radius, theta, phi } = spherical.current;
    cameraRef.current.position.setFromSphericalCoords(radius, phi, theta);

    // Keep the camera focused on the center of the scene
    cameraRef.current.lookAt(0, 0, 0);

    // Update previous mouse position
    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <GLView
      style={{ width: "100%", height: "100%" }}
      onContextCreate={onContextCreate}
      onMouseDown={(e) => {
        if (Platform.OS === "web") {
          handleMouseDown(e.nativeEvent);
        }
      }}
      onMouseMove={(e) => {
        if (Platform.OS === "web") {
          handleMouseMove(e.nativeEvent);
        }
      }}
      onMouseUp={(e) => {
        if (Platform.OS === "web") {
          handleMouseUp();
        }
      }}
      onClick={(e) => {
        if (Platform.OS === "web") {
          handlePress(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            e.target.clientWidth,
            e.target.clientHeight,
          );
        }
      }}
      {...(Platform.OS !== "web" ? panResponder.panHandlers : {})}
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

// const createTxsStars = () => {
//   const scene = sceneRef.current;
//   if (!scene) return;
//
//   txs.forEach((tx: any, index) => {
//     if (!(parseInt(tx.value) > 0)) {
//       return;
//     }
//     const txValue = Math.floor(parseInt(tx.value) / 10 ** DECIMALS);
//     const color = getColorByTxValue(txValue);
//
//     const generateRandomCoordinate = (min, max, excludeMin, excludeMax) => {
//       let value;
//       do {
//         value = Math.random() * (max - min) + min; // Generate a random value between min and max
//       } while (value > -excludeMax && value < excludeMax); // Regenerate if within the excluded range
//       return value;
//     };
//
//     const x = generateRandomCoordinate(
//       -CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
//       CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
//       -SPHERE_RADIUS,
//       SPHERE_RADIUS,
//     );
//     const y = generateRandomCoordinate(
//       -CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
//       CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
//       -SPHERE_RADIUS,
//       SPHERE_RADIUS,
//     );
//     const z = generateRandomCoordinate(
//       -CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
//       CAMERA_DISTANCE * MAX_ITEM_DISTANCE_FACTOR,
//       -SPHERE_RADIUS,
//       SPHERE_RADIUS,
//     );
//
//     const coordinates = { x, y, z };
//     addStar(scene, coordinates, color, tx);
//   });
// };

// Handle hover based on the platform (web or mobile)
// const handlePointerMove = (x, y, width, height) => {
// pointer.x = (x / width) * 2 - 1;
// pointer.y = -(y / height) * 2 + 1;
// // console.log("pointer: ", pointer);
// // console.log("sceneRef.current.children: ", sceneRef.current.children);
// raycaster.setFromCamera(pointer, cameraRef.current);
//
// const intersects = raycaster.intersectObjects(sceneRef.current.children);
//
// if (intersects.length > 0) {
//   // console.log("cameraRef: ", cameraRef.current);
//   if (sceneRef.current && cameraRef.current) {
//     raycaster.setFromCamera(pointer, cameraRef.current);
//     const hoveredItem = intersects[0]?.object || null;
//     console.log(" intersects[0]: ", intersects[0]);
//
//     hoveredItem?.material?.color.set(0xff0000);
//     setLastHoveredItem(hoveredItem);
//   }
// } else {
//   if (lastHoveredItem) {
//     lastHoveredItem?.material?.color.set(STAR_COLOR);
//   }
// }
// };