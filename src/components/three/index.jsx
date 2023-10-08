/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { CubeTextureLoader } from "three/src/loaders/CubeTextureLoader";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { MeshDepthMaterial, PointLightHelper, SpotLightHelper } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import Stars from '/src/assets/img/stars.jpg';
import Sun from '/src/assets/img/sun.jpg';
import Mercury from "/src/assets/img/mercury.jpg";
import Venus from "/src/assets/img/venus.jpg";
import Earth from "/src/assets/img/earth.jpg";

const SunAnimation = () => {
    const { scene } = useThree();
    const sunTexture = useLoader(TextureLoader, Sun);
    const MercuryTexture = useLoader(TextureLoader, Mercury);
    const VenusTexture = useLoader(TextureLoader, Venus);
    const EarthTexture = useLoader(TextureLoader, Earth);

    const sunLight = useRef(null);
    const sunRef = useRef(null);

    const MercuryRef = useRef(null);
    const MercuryParent = useRef(null);

    const VenusRef = useRef(null);
    const VenusParent = useRef(null);

    const EarthRef = useRef(null);
    const EarthParent = useRef(null);

    useEffect(() => {
        const cubeTextureLoader = new CubeTextureLoader();
        const cubeTexture = cubeTextureLoader.load([
            Stars, Stars, Stars, Stars, Stars, Stars
        ]);

        scene.background = cubeTexture;

        return () => {
            scene.background = null;
        };
    }, [scene]);

    
    useFrame(() => {

        sunRef.current.rotation.y += 0.005
        MercuryRef.current.rotation.y += 0.0050
        MercuryParent.current.rotation.y += 0.02
        VenusParent.current.rotation.y += 0.009
        VenusRef.current.rotation.y += 0.009
        EarthParent.current.rotation.y += 0.0036
        EarthRef.current.rotation.y += 0.0036
    });

    useHelper(sunLight, PointLightHelper, 0.5);

    
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 50, 100]} />
            <OrbitControls />
            <gridHelper position={[0, -1, 0]} args={[10000, 200]} />

            {/* SUN */}
            <mesh ref={sunRef} position={[0, 0, 0]}>
                <sphereGeometry attach="geometry" args={[16, 30, 30]} />
                <meshBasicMaterial attach="material" map={sunTexture} />
            </mesh>

            {/* MERCURY */}
            <Planet ParentRef={MercuryParent} PlanetRef={MercuryRef} PlanetTexture={MercuryTexture} Mass={3.2} Distance={28} />

            {/* VENUS */}
            <Planet ParentRef={VenusParent} PlanetRef={VenusRef} PlanetTexture={VenusTexture} Mass={4.5} Distance={48} />
            

            {/* EARTH */}
            <Planet ParentRef={EarthParent} PlanetRef={EarthRef} PlanetTexture={EarthTexture} Mass={6} Distance={70} />

            {/* LIGHTS */}
            <pointLight ref={sunLight} distance={10000} args={["white", 4000, 1000]} />
            
        </>
    );
}

function Planet({ParentRef, PlanetRef, PlanetTexture , Mass ,Distance}) {
    return (<mesh ref={ParentRef}>
              <sphereGeometry attach="geometry" args={[15, 30, 30]} />
              <mesh ref={PlanetRef} position={[Distance, 0, 0]}>
                  <sphereGeometry attach="geometry" args={[Mass, 30, 30]} />
                  <meshPhysicalMaterial attach="material" map={PlanetTexture} emissive="gray" emissiveIntensity={0.03} />
                  <ambientLight distance={10} intensity={0.03} />
              </mesh>
          </mesh>);
  }

export default SunAnimation
