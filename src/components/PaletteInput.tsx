// src/components/PaletteInput.tsx
import React, { useState, useEffect } from 'react'

interface PaletteInputProps {
  initialColors?: string[]
  onChange: (palette: string[]) => void
}

export default function PaletteInput({
  initialColors = ['#ffffff'],
  onChange,
}: PaletteInputProps) {
  const [colors, setColors] = useState<string[]>(initialColors)

  useEffect(() => {
    const normalized = colors
      .map(c => c.trim().startsWith('#') ? c.trim() : `#${c.trim()}`)
      .filter(c => /^#[0-9A-Fa-f]{6}$/.test(c))
    onChange(normalized)
  }, [colors, onChange])

  const updateColor = (idx: number, val: string) => {
    const copy = [...colors]
    copy[idx] = val
    setColors(copy)
  }
  const removeColor = (idx: number) =>
    setColors(prev => prev.filter((_, i) => i !== idx))
  const addColor = () =>
    setColors(prev => [...prev, '#ffffff'])

  return (
    <div className="space-y-3">
      {colors.map((col, idx) => (
        <div
          key={idx}
          className="flex items-center space-x-3 p-2 border-2 border-border rounded"
        >
          <input
            type="color"
            value={col}
            onChange={e => updateColor(idx, e.target.value)}
            className="w-10 h-10 p-0 border-2 border-border rounded cursor-pointer palette-swatch"
          />

          <input
            type="text"
            value={col}
            onChange={e => updateColor(idx, e.target.value)}
            className="flex-1 min-w-0 bg-background text-text font-mono p-2 border-2 border-border rounded"
          />

          {colors.length > 1 && (
            <button
              onClick={() => removeColor(idx)}
              className="text-red-500 hover:text-red-700 px-2"
              aria-label="Remove color"
            >
              del
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addColor}
        className="px-4 py-2 rounded border-2 border-border button-preset"
      >
        + Add Color
      </button>
    </div>
  )
}
