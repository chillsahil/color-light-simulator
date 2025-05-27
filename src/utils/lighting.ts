import chroma from 'chroma-js'

export function applyLightWithRoughness(
  hex: string,
  lightLab: [number, number, number],
  intensity: number,
  roughness: number
): string {
  const [L0, a0, b0] = chroma(hex).lab()
  const [Llight, alight, blight] = lightLab

  // how much intensity can "beat" roughness; tweak this [0–1] as you like
  const beatFactor = 0.1

  // original raw weights
  const rawDiffuseWeight = 1 - roughness
  const rawSpecularWeight = 1 - roughness

  // clamp them so at full intensity you still get at least beatFactor influence
  const diffuseWeight = Math.max(rawDiffuseWeight, beatFactor * intensity)
  const ks             = Math.max(rawSpecularWeight, beatFactor * intensity)

  // diffuse component
  const Ld = L0 + (Llight - L0) * intensity * diffuseWeight
  const ad = a0 + (alight - a0) * intensity * diffuseWeight * 0.5
  const bd = b0 + (blight - b0) * intensity * diffuseWeight * 0.5

  // specular exponent (unchanged)
  const alpha = Math.max(1, 128 * rawSpecularWeight)
  const NdotL = 1
  const Is = ks * Math.pow(NdotL, alpha) * intensity

  // combine and clamp to valid Lab L range
  const Lfinal = Math.min(100, Ld + Is * 50)
  return chroma.lab(Lfinal, ad, bd).hex()
}
