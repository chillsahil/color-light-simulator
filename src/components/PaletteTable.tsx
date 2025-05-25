// src/components/PaletteTable.tsx
import React from 'react'
import { hexToRgb } from '../utils/color'
import { applyLightWithRoughness } from '../utils/lighting'

interface PaletteTableProps {
  palette: string[]
  lightLab: [number, number, number]
  intensity: number
  roughness: number
}

export default function PaletteTable({
  palette,
  lightLab,
  intensity,
  roughness,
}: PaletteTableProps) {
  if (palette.length === 0) {
    return <p className="text-accent">No colors in palette.</p>
  }

  return (
    <table className="table-retro">
      <thead>
        <tr>
          <th>Old Color</th>
          <th>New Color</th>
        </tr>
      </thead>
      <tbody>
        {palette.map((hex, i) => {
          const [r, g, b] = hexToRgb(hex)
          const litHex = applyLightWithRoughness(
            hex,
            lightLab,
            intensity,
            roughness
          )
          const [lr, lg, lb] = hexToRgb(litHex)

          const oldRgb = `(${r},\u00A0${g},\u00A0${b})`
          const newRgb = `(${lr},\u00A0${lg},\u00A0${lb})`

          return (
            <tr key={i}>
              <td>
                <div
                  style={{
                    backgroundColor: hex,
                    width: '48px',
                    height: '48px',
                    margin: '0 auto',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                  }}
                />
                <div className="font-mono mt-1">{hex}</div>
                <div
                  className="font-mono text-xs text-secondary mt-1"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {oldRgb}
                </div>
              </td>

              <td>
                <div
                  style={{
                    backgroundColor: litHex,
                    width: '48px',
                    height: '48px',
                    margin: '0 auto',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                  }}
                />
                <div className="font-mono mt-1">{litHex}</div>
                <div
                  className="font-mono text-xs text-secondary mt-1"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {newRgb}
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
