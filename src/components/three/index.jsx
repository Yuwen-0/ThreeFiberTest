/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { CubeTextureLoader } from "three/src/loaders/CubeTextureLoader";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from 'three';


import Stars from '/src/assets/img/stars.jpg';
import Sun from '/src/assets/img/sun.jpg';
import Mercury from "/src/assets/img/mercury.jpg";
import Venus from "/src/assets/img/venus.jpg";
import Earth from "/src/assets/img/earth.jpg";
import Mars from "/src/assets/img/mars.jpg";
import Jupiter from "/src/assets/img/jupiter.jpg";
import Saturn from "/src/assets/img/saturn.jpg";
import Uranus from "/src/assets/img/uranus.jpg";
import Neptune from "/src/assets/img/neptune.jpg";
import SaturnRing from "/src/assets/img/saturn ring.png";
import UranusRing from "/src/assets/img/uranus ring.png";

const SunAnimation = () => {
    const { scene } = useThree();
    const sunTexture = useLoader(TextureLoader, Sun);
    const MercuryTexture = useLoader(TextureLoader, Mercury);
    const VenusTexture = useLoader(TextureLoader, Venus);
    const EarthTexture = useLoader(TextureLoader, Earth);
    const MarsTexture = useLoader(TextureLoader, Mars);
    const JupiterTexture = useLoader(TextureLoader, Jupiter);
    const SaturnTexture = useLoader(TextureLoader, Saturn);
    const UranusTexture = useLoader(TextureLoader, Uranus);
    const NeptuneTexture = useLoader(TextureLoader, Neptune);
    const SaturnRingTexture = useLoader(TextureLoader, SaturnRing);
    const UranusRingTexture = useLoader(TextureLoader, UranusRing);

    const sunLight = useRef(null);
    const sunRef = useRef(null);

    const MercuryRef = useRef(null);
    const MercuryParent = useRef(null);

    const VenusRef = useRef(null);
    const VenusParent = useRef(null);

    const EarthRef = useRef(null);
    const EarthParent = useRef(null);

    const MarsRef = useRef(null);
    const MarsParent = useRef(null);

    const JupiterRef = useRef(null);
    const JupiterParent = useRef(null);
    
    const SaturnRef = useRef(null);
    const SaturnParent = useRef(null);

    const UranusRef = useRef(null);
    const UranusParent = useRef(null);

    const NeptuneRef = useRef(null);
    const NeptuneParent = useRef(null);

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

        MarsParent.current.rotation.y += 0.003
        MarsRef.current.rotation.y += 0.003

        JupiterParent.current.rotation.y += 0.002
        JupiterRef.current.rotation.y += 0.001

        SaturnParent.current.rotation.y += 0.001
        SaturnRef.current.rotation.y += 0.007

        UranusParent.current.rotation.y += 0.0005
        UranusRef.current.rotation.y += 0.0005

        NeptuneParent.current.rotation.y += 0.0003
        NeptuneRef.current.rotation.y += 0.00003
    });

    
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

            {/* MARS */ }
            <Planet ParentRef={MarsParent} PlanetRef={MarsRef} PlanetTexture={MarsTexture} Mass={7.1} Distance={90} />
            
            {/* JUPITER */ }
            <Planet ParentRef={JupiterParent} PlanetRef={JupiterRef} PlanetTexture={JupiterTexture} Mass={23} Distance={120} />
            
            {/* SATURN */ }
            <Planet ParentRef={SaturnParent} PlanetRef={SaturnRef} PlanetTexture={SaturnTexture} Mass={17} Distance={170} >
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry rotateX={-Math.PI / 2} attach="geometry" args={[10, 30, 30]}/>
                    <meshBasicMaterial 
                        side={THREE.DoubleSide} 
                        attach="material" 
                        map={SaturnRingTexture} 
                        transparent
                        opacity={0.7} 
                    />
                </mesh>
            </Planet>
            
            {/* URANUS */ }
            <Planet ParentRef={UranusParent} PlanetRef={UranusRef} PlanetTexture={UranusTexture} Mass={13} Distance={220} >
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry rotateX={-Math.PI / 2} attach="geometry" args={[10, 20, 30]}/>
                    <meshBasicMaterial  
                        side={THREE.DoubleSide} 
                        attach="material" 
                        map={UranusRingTexture}
                        transparent
                        opacity={1} 
                    />
                </mesh>
            </Planet>
            
            {/* NEPTUNE */ }
            <Planet ParentRef={NeptuneParent} PlanetRef={NeptuneRef} PlanetTexture={NeptuneTexture} Mass={12} Distance={270} />

            {/* LIGHTS */}
            <pointLight ref={sunLight} distance={10000} args={["white", 4000, 1000]} />
            
        </>
    );
}

function Planet({ParentRef, PlanetRef, PlanetTexture , Mass ,Distance , children}) {
    return (<mesh ref={ParentRef}>
              <sphereGeometry attach="geometry" args={[15, 30, 30]} />
              <mesh ref={PlanetRef} position={[Distance, 0, 0]}>
                  <sphereGeometry attach="geometry" args={[Mass, 30, 30]} />
                  <meshPhysicalMaterial attach="material" map={PlanetTexture} emissive="gray" emissiveIntensity={0.03} />
                  <ambientLight distance={10} intensity={0.03} />
              {children}
              </mesh>
          </mesh>);
  }

  

export default SunAnimation
