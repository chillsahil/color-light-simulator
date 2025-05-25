// src/components/LightControls.tsx
import React, { useState, useEffect } from 'react'
import chroma from 'chroma-js'
import { hexToLab } from '../utils/color'

interface LightControlsProps {
  lightLab: [number, number, number]
  intensity: number
  roughness: number
  onLightChange: (lab: [number, number, number]) => void
  onIntensityChange: (val: number) => void
  onRoughnessChange: (val: number) => void
}

const LIGHT_PRESETS = [
  { name: 'Warm Bulb',   hex: '#FFD770', intensity: 0.6 },
  { name: 'Cool Bulb',   hex: '#FFFB98', intensity: 0.6 },
  { name: 'Daylight',    hex: '#FFFFFF', intensity: 1.0 },
  { name: 'Sunset',      hex: '#FFB347', intensity: 0.4 },
  { name: 'Fluorescent', hex: '#F0FFF0', intensity: 0.8 },
]

const ROUGHNESS_PRESETS = [
  { name: 'Glass',   value: 0.05 },
  { name: 'Glossy',  value: 0.2 },
  { name: 'Plastic', value: 0.4 },
  { name: 'Ceramic', value: 0.6 },
  { name: 'Matte',   value: 0.8 },
  { name: 'Rock',    value: 1.0 },
]

export default function LightControls({
  lightLab,
  intensity,
  roughness,
  onLightChange,
  onIntensityChange,
  onRoughnessChange,
}: LightControlsProps) {
  const labToHex = (lab: [number, number, number]) => chroma.lab(lab).hex()

  // Local hex input state
  const [hexInput, setHexInput] = useState(labToHex(lightLab))

  // Sync local input if parent prop changes
  useEffect(() => {
    setHexInput(labToHex(lightLab))
  }, [lightLab])

  const handleSwatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    setHexInput(hex)
    const [L, a, b] = chroma(hex).lab()
    onLightChange([L, a, b])
  }

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexInput(e.target.value)
  }

  const handleHexInputBlur = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      const [L, a, b] = chroma(hexInput).lab()
      onLightChange([L, a, b])
    } else {
      setHexInput(labToHex(lightLab))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="font-retro text-accent mb-2">Light Presets</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {LIGHT_PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => {
                const lab = hexToLab(p.hex)
                onLightChange(lab)
                onIntensityChange(p.intensity)
                setHexInput(p.hex)
              }}
              className="button-preset"
            >
              <span
                className="w-4 h-4 mr-2 border rounded"
                style={{ backgroundColor: p.hex }}
              />
              {p.name}
            </button>
          ))}
        </div>

        <p className="font-retro text-accent mb-2">Roughness Presets</p>
        <div className="flex flex-wrap gap-2">
          {ROUGHNESS_PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => onRoughnessChange(p.value)}
              className="button-preset"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Light Tint */}
     <div className="tint-section space-y-2">
       <label htmlFor="light-color-swatch" className="text-accent font-medium">
         Custom Light Tint
       </label>
       <div className="tint-row flex items-center gap-4">
         <input
           id="light-color-swatch"
           type="color"
           value={hexInput}
           onChange={handleSwatchChange}
           className="tint-swatch"
         />
         <input
           id="light-color-hex"
           type="text"
           value={hexInput}
           onChange={handleHexInputChange}
           onBlur={handleHexInputBlur}
           placeholder="#rrggbb"
           maxLength={7}
           className="bg-background text-text font-mono p-2 border-2 border-border rounded w-24 text-center"
         />
       </div>
     </div>

      <div>
        <label htmlFor="intensity-slider" className="block mb-1 text-accent">
          Intensity: {Math.round(intensity * 100)}%
        </label>
        <input
          id="intensity-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={intensity}
          onChange={e => onIntensityChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="roughness-slider" className="block mb-1 text-accent">
          Roughness: {Math.round(roughness * 100)}%
        </label>
        <input
          id="roughness-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={roughness}
          onChange={e => onRoughnessChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  )
}
