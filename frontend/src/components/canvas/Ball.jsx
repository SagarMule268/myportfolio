import React ,{Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float , OrbitControls ,Preload , useTexture  } from '@react-three/drei'
import CanvasLoader from '../Loader';
const Ball = ({imgUrl}) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0,0,0.05]} />
        <mesh castShadow receiveShadow scale={2.72}>
            <icosahedronGeometry args={[1,1]} />
            <meshStandardMaterial 
              color='#fff8eb'
              polygonOffset
              polygonOffsetFactor={-5}
              flatShading
            />
            <Decal
            map={decal}
            position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          flatShading
            />
        </mesh>
    </Float>
  )
}

const BallCanvas = ({icon})=>{

  return (
    <Canvas
    frameloop="demand"

    gl={{ preserveDrawingBuffer: true }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
        
      />
      <Ball imgUrl={icon} />
      <Preload all />
    </Suspense>
  </Canvas>
  )
}

export default BallCanvas