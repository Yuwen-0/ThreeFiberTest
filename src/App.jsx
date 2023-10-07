import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'

import Three from "./components/three"

import './App.css'

function App() {

  return (
    <>
      <Canvas id='threeCanvas'>
        <Html>
        </Html>
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>

    </>
  )
}

export default App
