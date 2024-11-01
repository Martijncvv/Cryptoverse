import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import {
  Image,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TxInfoOverlay from "@/components/animationFunctions/TxInfoOverlay";
import ColorLegend from "@/components/animationFunctions/ColorLegend";
import { moveStars } from "@/components/animationFunctions/moveStars";
import { addStar } from "@/components/animationFunctions/addStar";
import { generateRandomCoordinate } from "@/components/animationFunctions/generateRandomCoordinate";
import BottomCenterInfo from "@/components/animationFunctions/BottomCenterInfo";
import { addGlobeCore } from "@/components/animationFunctions/addGlobeCore";
import { delay } from "@/utils/delay";
import { Asset } from "expo-asset";

const SHARED_API_KEY_BASE = "WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX";
export const BASE_USDC_CONTRACT_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as `0x${string}`;
export const BASE_HIGHER_CONTRACT_ADDRESS =
  "0x0578d8a44db98b23bf096a382e016e29a5ce0ffe" as `0x${string}`;

global.THREE = global.THREE || THREE;

const SPHERE_RADIUS = 150;
const MIN_STAR_START_DISTANCE = 1000;
const CAMERA_DISTANCE = 1000;
const DECIMALS = 6;

const OFFSET = 10_000;
const TXS_CALL_DELAY = 7000;
let steps_in_ms = 3000;

type CryptoverseProps = PropsWithChildren<{}>;

export const Cryptoverse: React.FC<CryptoverseProps> = () => {
  const [clickedStar, setClickedStar] = useState();
  const [bottomText, setBottomText] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("USDC");
  const [page, setPage] = useState(1);
  const [txs, setTxs] = useState([]);
  const [isCreatingTxs, setIsCreatingTxs] = useState(false);
  const [startBlock, setStartBlock] = useState(0);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const starsRef = useRef([]);
  const pausedRef = useRef(false);
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

  const createdTxs = new Set();

  const getRandomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const fetchTokenTxs = async () => {
    if (pausedRef.current) return;
    setBottomText("Looking for stars..");
    const contractAddress =
      token === "USDC"
        ? BASE_USDC_CONTRACT_ADDRESS
        : BASE_HIGHER_CONTRACT_ADDRESS;
    const res = await fetch(
      `https://api.basescan.org/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=${page}&offset=${OFFSET}&startblock=${startBlock}&endblock=99999999&sort=desc&apikey=${SHARED_API_KEY_BASE}`,
    );
    if (!res.ok) {
      setBottomText("Something went wrong, contact me pls");
      throw new Error(
        `Fetch error, token txs, domain: info: ${res.status} ${res.statusText}`,
      );
    }

    let response = await res.json();
    if (response?.status === "0") {
      const delayInMs = getRandomDelay(7_500, 30_000);
      setBottomText(
        `Star searcher is busy, wait ${Math.floor(delayInMs / 1000)} secs`,
      );
      await delay(delayInMs);
      setBottomText("Retrying");
      const res = await fetch(
        `https://api.basescan.org/api?module=account&action=tokentx&contractaddress=${BASE_USDC_CONTRACT_ADDRESS}&page=${page}&offset=${OFFSET}&startblock=${startBlock}&endblock=99999999&sort=desc&apikey=${SHARED_API_KEY_BASE}`,
      );
      response = await res.json();
      if (response?.status === "0") {
        setBottomText("Star searcher is still overworked, try again later");
      }
    }
    if (response.result.length > 0) {
      setStartBlock(response.result[0].blockNumber);
      setTxs(response.result);
      setBottomText("");
    } else {
      setBottomText("No stars found");
    }
  };

  useEffect(() => {
    fetchTokenTxs();
  }, []);

  useEffect(() => {
    if (!isCreatingTxs && sceneReadyRef.current && txs.length > 0) {
      createTxsStars(txs);
    }
  }, [txs]);

  const createTxsStars = (txsToCreate) => {
    if (isCreatingTxs || pausedRef.current) return;

    const scene = sceneRef.current;
    if (!scene) return;
    setIsCreatingTxs(true);

    // smaller batches if less txs available
    if (txsToCreate.length < 200) {
      steps_in_ms = 2000;
    }
    if (txsToCreate.length < 50) {
      steps_in_ms = 1000;
    }

    let index = 0; // Start with the first transaction in txs
    const oldestTxTimestamp = parseInt(txs[txs.length - 1].timeStamp) * 1000;
    // Set up an interval to add stars one by one with a delay
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      // Stop the interval when all transactions are processed
      if (index >= txs.length || txsToCreate.length === 0) {
        setIsCreatingTxs(false);
        setPage((prev) => prev++);

        setTimeout(() => {
          fetchTokenTxs();
          console.log("CALLED");
        }, TXS_CALL_DELAY);

        clearInterval(interval);
        return;
      }

      const minTimestamp = oldestTxTimestamp + steps_in_ms * index;
      index++;

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

            // Add the new star to starsRef
            starsRef.current.push(newStar);
          }
          // Filter out the processed transaction from txsToCreate
          txsToCreate = txsToCreate.filter((item) => item.hash !== tx.hash);
        }
      });
      console.log("txsToCreate: ", txsToCreate.length);
    }, 1000);
  };

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    try {
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
        Asset.fromModule(require("../assets/images/Gaia_EDR3_darkened.png"))
          .uri,
      );

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      scene.background = texture;

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.z = 15;
      scene.add(directionalLight);

      sceneReadyRef.current = true;

      const globe = addGlobeCore(scene, SPHERE_RADIUS);

      // Animation function to render the scene
      const animate = () => {
        requestAnimationFrame(animate);

        cameraRef.current = camera;
        raycaster.setFromCamera(pointer, camera);
        if (!pausedRef.current) {
          globe.rotation.y += 0.003;

          moveStars({
            starsRef,
            sceneRef,
            SPHERE_RADIUS,
          });
        }
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      animate();
    } catch (e) {
      setError(
        "Browser doesn't support advanced 3d, try other browser, desktop or newer device.",
      );
    }
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
      }
    }
  };

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
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

    const rotationSpeed = 0.001;

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
  const handleTokenSwitchPress = () => {
    setStartBlock(0);
    setPage(1);
    setToken((prev) => (prev === "USDC" ? "HIGHER" : "USDC"));
  };

  useEffect(() => {
    // Set a timer to check if GLView was initialized
    const initializationTimeout = setTimeout(() => {
      if (!sceneRef.current) {
        setError(
          "Browser doesn't support advanced 3d, try other browser, desktop or newer device.",
        );
      }
    }, 2000);

    // Clear the timeout if onContextCreate initializes the GLView
    return () => clearTimeout(initializationTimeout);
  }, []);

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <Pressable onPress={togglePause} style={styles.pauseButtonContainer}>
        <Text style={{ color: "#656363" }}>
          {pausedRef.current ? "Resume" : "Pause"}
        </Text>
      </Pressable>

      {/*<Pressable*/}
      {/*  onPress={handleTokenSwitchPress}*/}
      {/*  style={styles.switchButtonContainer}*/}
      {/*>*/}
      {/*  <Text style={{ color: "#656363" }}>*/}
      {/*    {token === "USDC" ? "HIGHER" : "USDC"}*/}
      {/*  </Text>*/}
      {/*</Pressable>*/}
      {error ===
      "Browser doesn't support advanced 3d, try other browser, desktop or newer device." ? (
        <Image
          source={require("../assets/images/cryptoverse-placeholder.png")}
          style={styles.placeholderImage}
        />
      ) : null}

      <GLView
        style={{ flex: 1, width: "100%", height: "100%" }}
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
        {...panResponder.panHandlers}
      />

      <View style={styles.overlayContainer}>
        <TxInfoOverlay clickedStar={clickedStar} />
        <ColorLegend />
        <BottomCenterInfo text={bottomText} error={error} token={token} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  placeholderImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 1,
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3, // Ensures overlay is on top of everything
    pointerEvents: "box-none", // Allows touch events to pass through
  },

  pauseButtonContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    width: 60,
    marginHorizontal: "auto",
    zIndex: 1,
    backgroundColor: "rgba(129,128,128,0.2)", // Semi-transparent background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  switchButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translateX: -50 }],
    zIndex: 1,
    backgroundColor: "rgba(129,128,128,0.2)", // Semi-transparent background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
});
