// src/App.tsx
import React, { useState } from 'react'
import PaletteInput from './components/PaletteInput'
import LightControls from './components/LightControls'
import PaletteTable from './components/PaletteTable'

export default function App() {
  const [palette, setPalette] = useState<string[]>([
    '#309898',
    '#FF9F00',
    '#F4631E',
    '#CB0404',
  ])
  const [lightLab, setLightLab] = useState<[number, number, number]>([
    100, 0, 0,
  ])
  const [intensity, setIntensity] = useState(0.35)
  const [roughness, setRoughness] = useState(0.67)

  return (
    <div className="py-8 px-4 bg-background text-text font-mono">
      <h1 className="text-4xl font-retro text-center mb-4">
        Color & Lighting Simulator
      </h1>

      <p className="instructions">
        Add or remove colors in the Palette section, pick a light tint, and adjust
        intensity & roughness to see how your palette transforms — both in the table
        below and the swatch preview above.
      </p>

      <div className="three-col-container">
        <section className="section-card">
          <h2>Palette</h2>
          <PaletteInput initialColors={palette} onChange={setPalette} />
        </section>

        <section className="section-card">
          <h2>Light & Surface</h2>
          <LightControls
            lightLab={lightLab}
            intensity={intensity}
            roughness={roughness}
            onLightChange={setLightLab}
            onIntensityChange={setIntensity}
            onRoughnessChange={setRoughness}
          />
        </section>

        <section className="section-card overflow-auto">
          <h2>Preview Table</h2>
          <div className="overflow-x-auto">
            <PaletteTable
              palette={palette}
              lightLab={lightLab}
              intensity={intensity}
              roughness={roughness}
            />
          </div>
        </section>
      </div>

      <footer className="footer">
  <div>
    Built by{' '}
    <a
      href="https://chillsahil.io"
      className="text-link hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      chillsahil.io
    </a>
  </div>
  <div>Dedicated to Hope</div>
</footer>

    </div>
  )
}
