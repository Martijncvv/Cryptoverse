import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import { PanResponder, Platform, View } from "react-native";
import { COLOR_RANGES } from "@/components/animationFunctions/getColorByTxValue";
import TxInfoOverlay from "@/components/animationFunctions/TxInfoOverlay";
import ColorLegend from "@/components/animationFunctions/ColorLegend";
import { moveStars } from "@/components/animationFunctions/moveStars";
import { addGlobeCore } from "@/components/animationFunctions/addGlobeCore";
import { addStar } from "@/components/animationFunctions/addStar";
import { generateRandomCoordinate } from "@/components/animationFunctions/generateRandomCoordinate";
import BottomCenterInfo from "@/components/animationFunctions/BottomCenterInfo";

global.THREE = global.THREE || THREE;

const SPHERE_RADIUS = 150;
const MIN_STAR_START_DISTANCE = 1000;
const CAMERA_DISTANCE = 1000;

const DECIMALS = 6;

type FadeInViewProps = PropsWithChildren<{}>;

export const FadeInView: React.FC<FadeInViewProps> = () => {
  const [clickedStar, setClickedStar] = useState();
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

  const [page, setPage] = useState(1);
  const [txs, setTxs] = useState([]);
  const [isCreatingTxs, setIsCreatingTxs] = useState(false);
  const [startBlock, setStartBlock] = useState(0);
  const createdTxs = new Set();

  const fetchTokenTxs = async () => {
    if (txs.length > 0) {
      return null;
    }
    const OFFSET = 1000;
    const res = await fetch(
      `https://api.basescan.org/api?module=account&action=tokentx&contractaddress=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&page=${page}&offset=${OFFSET}&startblock=${startBlock}&endblock=99999999&sort=desc&apikey=WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, token txs, domain: info: ${res.status} ${res.statusText}`,
      );
    }
    let response = await res.json();
    console.log("response: ", response);
    setStartBlock(response.result[0].blockNumber);
    setTxs((prev) => [...prev, ...response.result]);
  };

  useEffect(() => {
    fetchTokenTxs();
  }, []);

  useEffect(() => {
    if (!isCreatingTxs && sceneReadyRef.current && txs.length > 0) {
      console.log("CALLED CALLED");
      setIsCreatingTxs(true);
      createTxsStars();
    }
  }, [txs]);

  const createTxsStars = () => {
    const scene = sceneRef.current;
    if (!scene) return;
    setIsCreatingTxs(true);

    let index = 0; // Start with the first transaction in txs

    // const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const oldestTxTimestamp = parseInt(txs[txs.length - 1].timeStamp) * 1000;
    console.log("oldestTxTimestamp: ", oldestTxTimestamp);
    // Set up an interval to add stars one by one with a delay
    let txsToCreate = txs;
    const interval = setInterval(() => {
      // Stop the interval when all transactions are processed
      if (index >= txs.length) {
        clearInterval(interval);
        return;
      }
      const STEPS_IN_MS = 5000;
      const minTimestamp = oldestTxTimestamp + STEPS_IN_MS * index;
      index++;
      console.log("txsToCreate: ", txsToCreate.length);

      txsToCreate.forEach((tx) => {
        if (parseInt(tx.timeStamp) * 1000 < minTimestamp) {
          const txValue =
            Math.floor((parseInt(tx.value) / 10 ** DECIMALS) * 100) / 100;

          // Only add stars for transactions with a value greater than 0.5
          if (txValue > 0.5 && !createdTxs.has(tx.hash)) {
            // Generate random spherical coordinates
            const radius = generateRandomCoordinate(
              MIN_STAR_START_DISTANCE,
              2000,
            );
            const theta = Math.random() * Math.PI * 2; // Azimuthal angle (0 to 2π)
            const phi = Math.acos(2 * Math.random() - 1); // Polar angle (0 to π)

            // Convert spherical coordinates to Cartesian coordinates
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            const coordinates = { x, y, z };
            const newStar = addStar(scene, coordinates, tx);
            createdTxs.add(tx.hash);

            // Filter out the processed transaction from txsToCreate
            txsToCreate = txsToCreate.filter((item) => item.hash !== tx.hash);

            // Add the new star to starsRef
            console.log("CREATE NEW STAR");
            starsRef.current.push(newStar);
          } else if (createdTxs.has(tx.hash)) {
            console.log("exists already");
          }
        }
      });
    }, 1000); // 1-second interval
  };

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const scene = new THREE.Scene();
    sceneRef.current = scene; // Store the scene in the ref

    const maxView = CAMERA_DISTANCE + SPHERE_RADIUS * 1.5;
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      maxView,
    );
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

      moveStars({
        starsRef,
        sceneRef,
        SPHERE_RADIUS,
      });

      renderer.render(scene, camera);

      // Notify the GLView that it needs to update
      gl.endFrameEXP();
    };

    animate();
  };

  const handlePress = (x, y, width, height) => {
    pointer.x = (x / width) * 2 - 1;
    pointer.y = -(y / height) * 2 + 1;
    raycaster.setFromCamera(pointer, cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children);

    if (intersects.length > 0) {
      if (sceneRef.current && cameraRef.current) {
        const clickedItem = intersects[0]?.object || null;
        setClickedStar(clickedItem);
        console.log("clickedItem: ", clickedItem);
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
    <View style={{ flex: 1 }}>
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

      <TxInfoOverlay clickedStar={clickedStar} />
      <ColorLegend colorRanges={COLOR_RANGES} />
      <BottomCenterInfo text={""} />
    </View>
  );
};
