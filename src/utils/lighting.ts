// src/utils/lighting.ts
import chroma from 'chroma-js'

export function applyLightWithRoughness(
  hex: string,
  lightLab: [number, number, number],
  intensity: number,
  roughness: number
): string {
  const [L0, a0, b0] = chroma(hex).lab()
  const [Llight, alight, blight] = lightLab

  const diffuseWeight = roughness
  const Ld = L0 + (Llight - L0) * intensity * diffuseWeight
  const ad = a0 + (alight - a0) * intensity * diffuseWeight * 0.5
  const bd = b0 + (blight - b0) * intensity * diffuseWeight * 0.5
  const ks = 1 - roughness
  const alpha = Math.max(1, 128 * (1 - roughness))
  const NdotL = 1
  const Is = ks * Math.pow(NdotL, alpha) * intensity

  const Lfinal = Math.min(100, Ld + Is * 50)
  return chroma.lab(Lfinal, ad, bd).hex()
}
