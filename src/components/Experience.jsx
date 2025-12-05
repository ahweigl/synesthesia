import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useRef } from "react";
import { Color } from "three";
import { Book } from "./Book";
import { pageAtom } from "./UI";

// Base colors with increased saturation
const baseColors = [
  "#4A27A9",
  "#7EABBD",
  "#D8981C",
  "#0D1135",
  "#2B197C",
];

// Convert to Color objects and increase saturation
const shadowColors = baseColors.map(hex => {
  const color = new Color(hex);
  // Increase saturation by converting to HSL, boosting saturation, then back to RGB
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  hsl.s = Math.min(1, hsl.s * 1.5); // Increase saturation by 50%
  const saturatedColor = new Color().setHSL(hsl.h, hsl.s, hsl.l);
  return saturatedColor;
});

export const Experience = () => {
  const [page] = useAtom(pageAtom);
  const shadowMaterialRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (shadowMaterialRef.current) {
      // Apply to page 2 and page 3 (two sets of pages)
      if (page === 2 || page === 3) {
        timeRef.current += delta;

        // Faster transition between colors (1.5 seconds instead of 3)
        const transitionDuration = 1.5;
        const cycleTime = timeRef.current % (transitionDuration * shadowColors.length);
        const currentIndex = Math.floor(cycleTime / transitionDuration);
        const nextIndex = (currentIndex + 1) % shadowColors.length;
        const t = (cycleTime % transitionDuration) / transitionDuration;

        // Smooth interpolation between current and next color
        const currentColor = shadowColors[currentIndex];
        const nextColor = shadowColors[nextIndex];
        const targetColor = currentColor.clone().lerp(nextColor, t);

        shadowMaterialRef.current.color.lerp(targetColor, 0.1);
        // More opaque shadow for special pages
        shadowMaterialRef.current.opacity = 0.5;
      } else {
        // Regular black shadow for all other pages
        const blackColor = new Color(0, 0, 0);
        shadowMaterialRef.current.color.lerp(blackColor, 0.1);
        // Regular opacity for other pages
        shadowMaterialRef.current.opacity = 0.2;
        timeRef.current = 0; // Reset timer when not on target pages
      }
    }
  });

  return (
    <>
      <Float
        rotation-x={-Math.PI / 4}
        floatIntensity={1}
        speed={2}
        rotationIntensity={0.5}
      >
        <Book />
      </Float>
      <OrbitControls />
      <Environment preset="sunset" intensity={0.3}></Environment>
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.4} />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial ref={shadowMaterialRef} transparent opacity={0.5} />
      </mesh>
    </>
  );
};
