// src/components/LightControls.tsx
import React, { useState, useEffect } from 'react'
import chroma from 'chroma-js'
import { hexToLab } from '../utils/color'

interface LightControlsProps {
  lightLab: [number, number, number]
  intensity: number         // 0.0 – 1.0
  roughness: number         // 0.0 – 1.0
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

  const defaultLight = LIGHT_PRESETS[0]        // Warm Bulb
  const defaultRoughness = ROUGHNESS_PRESETS[0] // Glass

  const [selectedLightPreset, setSelectedLightPreset] = useState(defaultLight.name)
  const [selectedRoughnessPreset, setSelectedRoughnessPreset] = useState(defaultRoughness.name)
  const [hexInput, setHexInput] = useState(labToHex(lightLab))

  // on mount: apply both defaults
  useEffect(() => {
    // Light
    const lab = hexToLab(defaultLight.hex)
    setHexInput(defaultLight.hex)
    onLightChange(lab)
    onIntensityChange(defaultLight.intensity)

    // Roughness
    onRoughnessChange(defaultRoughness.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // sync hexInput when prop changes
  useEffect(() => {
    setHexInput(labToHex(lightLab))
  }, [lightLab])

  // clear just the light preset (tint + intensity)
  const clearLightPreset = () => {
    setSelectedLightPreset(null as any)
  }
  // clear just the roughness preset
  const clearRoughnessPreset = () => {
    setSelectedRoughnessPreset(null as any)
  }

  // --- Light tint handlers ---
  const handleSwatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearLightPreset()
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
      clearLightPreset()
      const [L, a, b] = chroma(hexInput).lab()
      onLightChange([L, a, b])
    } else {
      setHexInput(labToHex(lightLab))
    }
  }

  // --- Intensity handlers ---
  const handleIntensityChange = (val: number) => {
    clearLightPreset()
    onIntensityChange(val)
  }
  const handleIntensityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearLightPreset()
    let pct = parseInt(e.target.value, 10)
    if (isNaN(pct)) pct = 0
    pct = Math.max(0, Math.min(100, pct))
    onIntensityChange(pct / 100)
  }

  // --- Roughness handlers ---
  const handleRoughnessChange = (val: number) => {
    clearRoughnessPreset()
    onRoughnessChange(val)
  }
  const handleRoughnessInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearRoughnessPreset()
    let pct = parseInt(e.target.value, 10)
    if (isNaN(pct)) pct = 0
    pct = Math.max(0, Math.min(100, pct))
    onRoughnessChange(pct / 100)
  }

  return (
    <div className="space-y-6">
      {/* Light Presets */}
      <div>
        <p className="font-retro text-accent mb-2">Light Presets</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {LIGHT_PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => {
                setSelectedLightPreset(p.name)
                onLightChange(hexToLab(p.hex))
                onIntensityChange(p.intensity)
                setHexInput(p.hex)
              }}
              className={`button-preset${selectedLightPreset === p.name ? ' active' : ''}`}
            >
              <span
                className="w-4 h-4 mr-2 border rounded"
                style={{ backgroundColor: p.hex }}
              />
              {p.name}
            </button>
          ))}
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
          <br />
        {/* Intensity Control */}
        <div>
          <label htmlFor="intensity-input" className="block mb-1 text-accent">
            Intensity:
            <input
              id="intensity-input"
              type="number"
              min={0}
              max={100}
              value={Math.round(intensity * 100)}
              onChange={handleIntensityInput}
              className="ml-2 slider-number-input"
            />
          </label>
          <input
            id="intensity-slider"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={intensity}
            onChange={e => handleIntensityChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Roughness Presets */}
      <div>
        <p className="font-retro text-accent mb-2">Roughness Presets</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {ROUGHNESS_PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => {
                setSelectedRoughnessPreset(p.name)
                onRoughnessChange(p.value)
              }}
              className={`button-preset${selectedRoughnessPreset === p.name ? ' active' : ''}`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Roughness Control */}
        <div>
          <label htmlFor="roughness-input" className="block mb-1 text-accent">
            Roughness:
            <input
              id="roughness-input"
              type="number"
              min={0}
              max={100}
              value={Math.round(roughness * 100)}
              onChange={handleRoughnessInput}
              className="ml-2 slider-number-input"
            />
          </label>
          <input
            id="roughness-slider"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={roughness}
            onChange={e => handleRoughnessChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
