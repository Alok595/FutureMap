'use client'

import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={1} />
        {/* Subtle gold particles floating slowly */}
        <Sparkles 
          count={250} 
          scale={25} 
          size={2.5} 
          speed={0.4} 
          opacity={0.8} 
          color="#c5a059" 
        />
      </Canvas>
    </div>
  )
}
