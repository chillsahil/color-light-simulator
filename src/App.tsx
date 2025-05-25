// src/App.tsx
import React, { useState } from 'react'
import PaletteInput from './components/PaletteInput'
import LightControls from './components/LightControls'
import PaletteTable from './components/PaletteTable'

export default function App() {
  const [palette, setPalette] = useState<string[]>([
    '#309898',
    '#ff9f00',
    '#f4631e',
    '#cb0404',
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
        Add or remove colors in the Palette section, pick a light tint and roughness preset or customize them, and see how your colors look under different lighting conditions in the Preview Table.
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
            onRoughnessChange={setRoughness}
            onLightChange={setLightLab}
            onIntensityChange={setIntensity}
            
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
  <div className="flex flex-col items-center">
    <div className="flex items-center space-x-4">
      Built by{' '}
      <a
        href="https://chillsahil.io"
        className="text-link text-lg hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        chillsahil.io
      </a>
      
    </div>
    <div className="text-center text-sm text-accent mt-2">
      Made with ❤️ using React and Chroma.js
    </div>
  </div>
  <div className="mt-4">Dedicated to Hope</div>
  <div>
      <a
        href="https://github.com/chillsahil/color-light-simulator"
        className="text-link text-lg hover:underline flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="w-5 h-5 mr-1"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 .198a8 8 0 00-2.528 15.59c.4.074.547-.174.547-.386 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.926-.89-1.173-.89-1.173-.727-.497.055-.487.055-.487.803.056 1.226.825 1.226.825.715 1.224 1.874.87 2.33.665.073-.517.28-.87.508-1.07-1.777-.202-3.644-.888-3.644-3.953 0-.873.312-1.588.824-2.148-.083-.203-.357-1.018.078-2.12 0 0 .672-.215 2.2.82a7.658 7.658 0 012.003-.27 7.66 7.66 0 012.003.27c1.527-1.036 2.198-.82 2.198-.82.437 1.102.163 1.917.08 2.12.513.56.823 1.275.823 2.148 0 3.073-1.87 3.748-3.652 3.947.287.247.543.735.543 1.482 0 1.07-.01 1.933-.01 2.195 0 .214.146.463.55.384A8.001 8.001 0 008 .198z"
          />
        </svg>
        View Source
      </a></div>
</footer>

      


    </div>
  )
}
