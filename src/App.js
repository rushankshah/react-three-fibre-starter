import { MeshWobbleMaterial, OrbitControls, softShadows } from 'drei';
import { useRef, useState } from 'react';
import { useSpring } from 'react-spring/three';
import { animated } from 'react-spring/three';
import { Canvas, useFrame } from 'react-three-fiber';
import './App.scss';

softShadows()

const SpinningMesh = ({ position, args }) => {

  const [expand, setExpand] = useState(false)

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1]
  })

  const mesh = useRef(null)
  useFrame(() => (
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  ))
  return (
    <animated.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial attach='material' color='pink' speed={1} factor={1} />
    </animated.mesh>
  )
}


function App() {
  return (
    <>
      <Canvas colorManagement camera={{ position: [-5, 2, 10], fov: 40 }} shadowMap>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1.2} shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={50} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottomr={-10} castShadow />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
          <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]}></SpinningMesh>
          <SpinningMesh position={[-2, 1, -5]}></SpinningMesh>
          <SpinningMesh position={[5, 1, -2]}></SpinningMesh>
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
