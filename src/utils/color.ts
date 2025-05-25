// src/utils/color.ts
import chroma from 'chroma-js'

export function hexToLab(hex: string): [number, number, number] {
  const [L, a, b] = chroma(hex).lab()
  return [L, a, b]
}


export function hexToRgb(hex: string): [number, number, number] {
  const [r, g, b] = (chroma(hex).rgb() as number[]).map((v: number) =>
    Math.round(v)
  )
  return [r, g, b]
}

