/**
 * Hero3D.tsx – Wrapper khusus hero section
 *
 * v5: Simplified, hanya wrapper tipis ke WebGLBackground
 * dengan intensity yang tepat agar teks tetap kontras.
 */

import React from 'react'
import { WebGLBackground } from './WebGLBackground'

export const Hero3D: React.FC<{
  intensity?: 'subtle' | 'hero'
}> = ({ intensity = 'subtle' }) => {
  return <WebGLBackground intensity={intensity} />
}

export default Hero3D
