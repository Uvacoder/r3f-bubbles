import React from 'react'

import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from 'react-postprocessing'
import { KernelSize } from 'postprocessing'

export default function Effects() {
  return (
    <EffectComposer>
      <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
      <Bloom kernelSize={KernelSize.VERY_LARGE} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}