// src/components/PaletteTable.tsx
import React, { useState } from 'react'
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
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({})

  // helper that returns an array of React nodes with <wbr/> after each comma
  const withCommaBreaks = (s: string) =>
    s.split(',').flatMap((piece, i, arr) => {
      const text = piece + (i < arr.length - 1 ? ',' : '')
      return i < arr.length - 1
        ? [text, <wbr key={i} />]
        : [text]
    })

  const handleCopy = (value: string, id: string) => {
    navigator.clipboard.writeText(value)
    setCopiedMap(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setCopiedMap(prev => ({ ...prev, [id]: false }))
    }, 2000)
  }

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

          const oldRgb = `(${r}, ${g}, ${b})`
          const newRgb = `(${lr}, ${lg}, ${lb})`

          const oldId = `${i}-old`
          const newId = `${i}-new`

          return (
            <tr key={i}>
              <td>
                <div
                  style={{
                    backgroundColor: hex,
                    width: '48px',
                    height: '48px',
                    margin: '0 auto',
                    border: '2px solid var(--border-color)',
                    borderRadius: '6px',
                  }}
                />
                <div
                  className="font-mono mt-1 copy-container"
                  onClick={() => handleCopy(hex, oldId)}
                >
                  {hex}
                  <span className="copy-button">
                    {copiedMap[oldId] ? 'Copied!' : 'Copy'}
                  </span>
                </div>
                <div className="font-mono text-xs text-secondary mt-1">
                  {withCommaBreaks(oldRgb)}
                </div>
              </td>

              <td>
                <div
                  style={{
                    backgroundColor: litHex,
                    width: '48px',
                    height: '48px',
                    margin: '0 auto',
                    border: '2px solid var(--border-color)',
                    borderRadius: '6px',
                  }}
                />
                <div
                  className="font-mono mt-1 copy-container"
                  onClick={() => handleCopy(litHex, newId)}
                >
                  {litHex}
                  <span className="copy-button">
                    {copiedMap[newId] ? 'Copied!' : 'Copy'}
                  </span>
                </div>
                <div className="font-mono text-xs text-secondary mt-1">
                  {withCommaBreaks(newRgb)}
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
