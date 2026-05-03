import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, Code2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { phases, baseCurriculum } from '../data/index'

const PHASE_GRADIENTS = {
  1: 'from-blue-600/20 to-blue-900/10',
  2: 'from-purple-600/20 to-purple-900/10',
  3: 'from-green-600/20 to-green-900/10',
  4: 'from-yellow-600/20 to-yellow-900/10',
  5: 'from-orange-600/20 to-orange-900/10',
  6: 'from-red-600/20 to-red-900/10',
}
const PHASE_BORDER = {
  1: 'border-blue-800/40',
  2: 'border-purple-800/40',
  3: 'border-green-800/40',
  4: 'border-yellow-800/40',
  5: 'border-orange-800/40',
  6: 'border-red-800/40',
}

export default function PhaseOverview() {
  const { phaseId } = useParams()
  const id = parseInt(phaseId)
  const phase = phases.find(p => p.id === id)
  const days = baseCurriculum.filter(l => l.phase === id)
  const { isComplete, phaseProgress } = useApp()
  const navigate = useNavigate()
  const pg = phaseProgress(id)

  if (!phase) return <div className="p-8 text-gray-400">Phase not found.</div>

  const nextLesson = days.find(l => !isComplete(l.day)) || days[0]

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
      {/* Back */}
      <Link to="/" className="btn-ghost text-sm mb-6 inline-flex">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      {/* Phase header */}
      <div className={`rounded-2xl border ${PHASE_BORDER[id]} bg-gradient-to-br ${PHASE_GRADIENTS[id]} p-8 mb-8`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-gray-500 mb-1">Phase {id} · {phase.days}</p>
            <h1 className="text-3xl font-black text-white mb-3">{phase.title}</h1>
            <p className="text-gray-300 max-w-2xl">{phase.description}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-white">{pg.pct}%</div>
            <div className="text-sm text-gray-400">{pg.done}/{pg.total} done</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          {phase.tools.map(t => (
            <span key={t} className="tag bg-black/30 text-gray-300 border border-white/10">{t}</span>
          ))}
        </div>

        <div className="mt-6">
          <div className="h-2 bg-black/30 rounded-full">
            <div className="h-full bg-white/30 rounded-full transition-all" style={{ width: `${pg.pct}%` }} />
          </div>
        </div>

        <div className="mt-5">
          <button onClick={() => navigate(`/lesson/${nextLesson.day}`)} className="btn-primary">
            {pg.done === 0 ? 'Start Phase' : 'Continue'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project callout */}
      <div className="card mb-8 border-yellow-800/40">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">Phase Project</span>
        </div>
        <p className="text-white font-medium">{phase.project}</p>
      </div>

      {/* Lessons list */}
      <h2 className="text-xl font-bold text-white mb-4">All Lessons</h2>
      <div className="space-y-2">
        {days.map(lesson => {
          const done = isComplete(lesson.day)
          return (
            <Link
              key={lesson.day}
              to={`/lesson/${lesson.day}`}
              className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800/50 transition-all group"
            >
              <div className="flex-shrink-0">
                {done
                  ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                  : <Circle className="w-5 h-5 text-gray-700 group-hover:text-gray-500" />
                }
              </div>
              <div className="flex-shrink-0 w-10 text-center">
                <span className="text-xs font-mono text-gray-500">D{String(lesson.day).padStart(2, '0')}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${done ? 'text-gray-400' : 'text-white group-hover:text-blue-300'} transition-colors`}>
                  {lesson.title}
                </p>
                {lesson.objectives && (
                  <p className="text-xs text-gray-600 truncate mt-0.5">{lesson.objectives[0]}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
                {lesson.duration || '2h'}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 flex-shrink-0" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
