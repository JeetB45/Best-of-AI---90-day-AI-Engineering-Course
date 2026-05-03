import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Code2, Brain, Database, Bot, Rocket, Layers } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { phases, baseCurriculum } from '../data/index'

const PHASE_ICONS = {
  1: <Code2 className="w-5 h-5" />,
  2: <Brain className="w-5 h-5" />,
  3: <Bot className="w-5 h-5" />,
  4: <Database className="w-5 h-5" />,
  5: <Layers className="w-5 h-5" />,
  6: <Rocket className="w-5 h-5" />,
}

const PHASE_GRADIENTS = {
  1: 'from-blue-600 to-blue-800',
  2: 'from-purple-600 to-purple-800',
  3: 'from-green-600 to-green-800',
  4: 'from-yellow-600 to-yellow-800',
  5: 'from-orange-600 to-orange-800',
  6: 'from-red-600 to-red-800',
}

const PHASE_TEXT = {
  1: 'text-blue-400',
  2: 'text-purple-400',
  3: 'text-green-400',
  4: 'text-yellow-400',
  5: 'text-orange-400',
  6: 'text-red-400',
}

export default function HomePage() {
  const { totalCompleted, phaseProgress, isComplete } = useApp()
  const navigate = useNavigate()

  // Find first incomplete lesson
  const nextLesson = baseCurriculum.find(l => !isComplete(l.day))

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" />
          Learn AI from Scratch — 90 Days
        </div>
        <h1 className="text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          Build Real AI.<br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            Not Just Theory.
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          From Python basics to deploying autonomous AI agents — every concept taught with live code you run right here in the browser. No setup. No installs. Just learn.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {nextLesson && (
            <button
              onClick={() => navigate(`/lesson/${nextLesson.day}`)}
              className="btn-primary text-base px-6 py-3"
            >
              {totalCompleted === 0 ? 'Start Learning — Day 1' : `Continue — Day ${nextLesson.day}`}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
          <Link to="/phase/1" className="btn-secondary text-base px-6 py-3">
            Browse Curriculum
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      {totalCompleted > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-12 p-5 bg-gray-900 border border-gray-800 rounded-2xl">
          <div className="text-center">
            <div className="text-3xl font-black text-white">{totalCompleted}</div>
            <div className="text-xs text-gray-500 mt-1">Days Completed</div>
          </div>
          <div className="text-center border-x border-gray-800">
            <div className="text-3xl font-black text-white">{Math.round((totalCompleted / 90) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">{90 - totalCompleted}</div>
            <div className="text-xs text-gray-500 mt-1">Days Remaining</div>
          </div>
        </div>
      )}

      {/* Phases grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">The 6 Phases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map(phase => {
            const pg = phaseProgress(phase.id)
            const firstDay = baseCurriculum.find(l => l.phase === phase.id)

            return (
              <Link
                key={phase.id}
                to={`/phase/${phase.id}`}
                className="group card hover:border-gray-600 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                {/* Phase header */}
                <div className={`inline-flex items-center gap-2 text-sm font-semibold mb-3 ${PHASE_TEXT[phase.id]}`}>
                  {PHASE_ICONS[phase.id]}
                  Phase {phase.id}
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {phase.title}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{phase.days}</p>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{phase.description}</p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {phase.tools.map(tool => (
                    <span key={tool} className="tag bg-gray-800 text-gray-400">{tool}</span>
                  ))}
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span>{pg.done}/{pg.total} lessons</span>
                  <span className={pg.done > 0 ? PHASE_TEXT[phase.id] : ''}>{pg.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${PHASE_GRADIENTS[phase.id]} transition-all`}
                    style={{ width: `${pg.pct}%` }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Why section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: "Live Python IDE", desc: "Write and run Python code directly in your browser. Powered by Pyodide (WebAssembly). No setup required." },
          { icon: <Shield className="w-5 h-5 text-green-400" />, title: "Your Keys, Your Control", desc: "API keys are stored only in your browser session. They never touch our servers. Period." },
          { icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />, title: "20% Theory, 80% Code", desc: "Every concept is immediately applied with hands-on exercises and real projects you can show employers." },
        ].map(item => (
          <div key={item.title} className="card text-center">
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
