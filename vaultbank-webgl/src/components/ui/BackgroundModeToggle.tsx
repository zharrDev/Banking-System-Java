import React from 'react'
import { Box, PenTool, Layers } from 'lucide-react'
import { useBackgroundMode, type BgMode } from '@/theme/BackgroundModeContext'

const modes: {key: BgMode, label: string, icon: React.ReactNode, title: string}[] = [
  { key: 'sketch', label: 'Sketch', icon: <PenTool className="h-3.5 w-3.5"/>, title: 'Anime.js sketch – ringan' },
  { key: 'webgl', label: '3D', icon: <Box className="h-3.5 w-3.5"/>, title: 'Three.js WebGL – premium' },
  { key: 'hybrid', label: 'Hybrid', icon: <Layers className="h-3.5 w-3.5"/>, title: 'Sketch + WebGL tipis' },
]

export const BackgroundModeToggle: React.FC<{compact?: boolean}> = ({ compact = false }) => {
  const { bgMode, setBgMode } = useBackgroundMode()
  return (
    <div className="flex items-center rounded-[16px] border border-line-soft bg-white/70 backdrop-blur p-1 shadow-sm" role="group" aria-label="Pilih mode background">
      {modes.map(m => (
        <button
          key={m.key}
          type="button"
          onClick={() => setBgMode(m.key)}
          title={m.title}
          className={`flex items-center gap-1.5 rounded-[12px] px-2.5 py-1.5 text-[11px] font-bold transition-all ${
            bgMode === m.key
              ? 'bg-navy-800 text-white shadow-sm'
              : 'text-navy-500 hover:text-navy-800 hover:bg-navy-50/70'
          }`}
        >
          {m.icon}
          {!compact && <span className="hidden sm:inline tracking-wide">{m.label}</span>}
        </button>
      ))}
    </div>
  )
}
