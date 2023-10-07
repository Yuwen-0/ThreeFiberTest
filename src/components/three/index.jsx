import { DirectionalLight } from "three";
import { OrbitControls, PerspectiveCamera , DirectionalLightHelper } from "@react-three/drei";
import { angleToRadians } from "../../utils/angle";
import { useEffect , useRef } from "react";
import { useFrame } from "@react-three/fiber";
/* eslint-disable react/no-unknown-property */
export default function Three() {
    
    const controlOrbitRef = useRef(null);
    const boxRef = useRef(null);


    useFrame((state) => {
        if (controlOrbitRef.current){
            const {x , y} = state.mouse;
            controlOrbitRef.current.setAzimuthalAngle(-x * angleToRadians(45));
            controlOrbitRef.current.setPolarAngle((y + .5) * angleToRadians(90 - 30));
        }

        if(boxRef.current){
            boxRef.current.rotation.y += 0.01
        }

        
    })
    useEffect(() => {
        if (controlOrbitRef.current){
           controlOrbitRef.current.enableRotate = false
           controlOrbitRef.current.enablePan = false
           console.log(controlOrbitRef.current);
        }
    }, [OrbitControls.current]);

        

    const light = new DirectionalLight(0xffffff, 1);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <OrbitControls minPolarAngle={1} maxPolarAngle={2} autoRotateSpeed={0.5} autoRotate ref={controlOrbitRef} />
            {/* Ball*/}
            <mesh  position={[0, 1.5 , 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>

            {/* Cube */}
            <mesh ref={boxRef}  position={[0, .5, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="blue" />
            </mesh>

            {/* Floor */}
            <mesh rotation={[-(angleToRadians(90)), 0, 0]} >
                <planeGeometry args={[10, 10]}  />
                <meshStandardMaterial color="hsl(206, 64%, 50%)" />
            </mesh>

            {/* Light */}
            <mesh>
                <directionalLight args={[0xffffff, 1]}  position={[1, 1, 2.5]}/>
            </mesh>
            <DirectionalLightHelper args={[light, 5]} />


        </>
    )

}

