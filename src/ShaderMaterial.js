import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { useTextureLoader, useCubeTextureLoader, MeshDistortMaterial } from 'drei'
import { useControl } from 'react-three-gui'
import mergeRefs from 'merge-refs'

const MATERIAL = 'Material'
const SHADER = 'Shader'

const ShaderMaterial = React.forwardRef(function ShaderMaterial(props, forwardedRef) {
  const matRef = useRef()

  // controls
  const roughness = useControl('roughness', { group: MATERIAL, type: 'number', value: 0.1, max: 1 })
  const metalness = useControl('metalness', { group: MATERIAL, type: 'number', value: 1, max: 1 })
  const clearcoat = useControl('clearcoat', { group: MATERIAL, type: 'number', value: 1, max: 1 })
  const clearcoatRoughness = useControl('clearcoat roughness', { group: MATERIAL, type: 'number', value: 1, max: 1 })
  const bumpScale = useControl('bump scale', { group: MATERIAL, type: 'number', value: 0.32, step: 0.1, max: 5 })
  const radius = useControl('radius', { group: SHADER, type: 'number', value: 1, max: 1 })
  const distort = useControl('distort', { group: SHADER, type: 'number', value: 0.4, max: 1 })

  const bumpMap = useTextureLoader('./bump.jpg')
  const envMap = useCubeTextureLoader(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: 'cube/' })

  // For some reason the envmap looks different if applied later-on
  useEffect(() => void (matRef.current.envMap = envMap), [envMap])

  useFrame((state) => {
    matRef.current.time = state.clock.getElapsedTime()
    matRef.current.radius = radius
    matRef.current.distort = distort
  })

  return (
    <MeshDistortMaterial
      ref={mergeRefs(forwardedRef, matRef)}
      color={'#010101'}
      roughness={roughness}
      metalness={metalness}
      bumpMap={bumpMap}
      bumpScale={bumpScale / 100}
      clearcoat={clearcoat}
      clearcoatRoughness={clearcoatRoughness}
    />
  )
})

export default ShaderMaterial
