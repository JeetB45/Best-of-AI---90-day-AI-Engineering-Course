import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Lock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { phases } from '../data/index'

const PHASE_COLORS = {
  1: 'text-blue-400 bg-blue-950/40 border-blue-900/50',
  2: 'text-purple-400 bg-purple-950/40 border-purple-900/50',
  3: 'text-green-400 bg-green-950/40 border-green-900/50',
  4: 'text-yellow-400 bg-yellow-950/40 border-yellow-900/50',
  5: 'text-orange-400 bg-orange-950/40 border-orange-900/50',
  6: 'text-red-400 bg-red-950/40 border-red-900/50',
}

const PHASE_DOT = {
  1: 'bg-blue-400',
  2: 'bg-purple-400',
  3: 'bg-green-400',
  4: 'bg-yellow-400',
  5: 'bg-orange-400',
  6: 'bg-red-400',
}

export default function Sidebar() {
  const { sidebarOpen, lessonsByPhase, isComplete, phaseProgress, progress } = useApp()
  const params = useParams()
  const currentDay = params.dayId ? parseInt(params.dayId) : null
  const progressPct = Math.round((Object.keys(progress).length / 90) * 100)

  const [openPhases, setOpenPhases] = useState(() => {
    if (currentDay) {
      const lesson = Object.values(lessonsByPhase).flat().find(l => l.day === currentDay)
      return lesson ? [lesson.phase] : [1]
    }
    return [1]
  })

  const togglePhase = (id) => {
    setOpenPhases(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  if (!sidebarOpen) return null

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col flex-shrink-0 overflow-hidden">
      {/* Sidebar header */}
      <div className="p-4 border-b border-gray-800">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Curriculum</p>
        <p className="text-xs text-gray-600 mt-0.5">90 days · 6 phases</p>
      </div>

      {/* Phase list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {phases.map(phase => {
          const pg = phaseProgress(phase.id)
          const isOpen = openPhases.includes(phase.id)
          const days = lessonsByPhase[phase.id] || []

          return (
            <div key={phase.id} className="mb-1">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-900 transition-colors group"
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PHASE_DOT[phase.id]}`} />
                <span className="flex-1 text-xs font-semibold text-gray-300 group-hover:text-white truncate">
                  {phase.shortTitle}
                </span>
                <span className="text-xs text-gray-600 font-mono mr-1">
                  {pg.done}/{pg.total}
                </span>
                {isOpen
                  ? <ChevronDown className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                  : <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                }
              </button>

              {/* Progress bar */}
              {pg.done > 0 && (
                <div className="mx-3 mb-1 h-0.5 bg-gray-800 rounded">
                  <div
                    className={`h-full rounded transition-all ${PHASE_DOT[phase.id].replace('bg-', 'bg-')}`}
                    style={{ width: `${pg.pct}%` }}
                  />
                </div>
              )}

              {/* Day list */}
              {isOpen && (
                <div className="ml-4 mb-2">
                  {days.map(lesson => {
                    const done = isComplete(lesson.day)
                    const isCurrent = currentDay === lesson.day

                    return (
                      <Link
                        key={lesson.day}
                        to={`/lesson/${lesson.day}`}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mx-1 mb-0.5 text-xs transition-colors group ${
                          isCurrent
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-700/40'
                            : 'hover:bg-gray-900 text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {done
                          ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                          : <Circle className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? 'text-blue-400' : 'text-gray-700'}`} />
                        }
                        <span className="font-mono text-gray-600 flex-shrink-0">D{String(lesson.day).padStart(2,'0')}</span>
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Overall progress */}
      <div className="p-3 border-t border-gray-800">
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white font-bold">{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
      </div>
    </aside>
  )
}
