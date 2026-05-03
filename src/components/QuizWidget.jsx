import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, HelpCircle, ChevronRight } from 'lucide-react'

export default function QuizWidget({
  questions = [],
  isComplete = false,
  onMarkComplete,
  onNextLesson,
}) {
  const [current,  setCurrent]  = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers,  setAnswers]  = useState([])
  const [quizDone, setQuizDone] = useState(false)
  const [marked,   setMarked]   = useState(false)

  // Reset all state when the question set changes (new lesson loaded).
  // The parent also passes key={day} which forces a full remount — this is
  // a belt-and-suspenders guard for edge cases.
  useEffect(() => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setQuizDone(false)
    setMarked(false)
  }, [questions])

  if (!questions.length) return null

  const q          = questions[current]
  const isAnswered = selected !== null
  const isCorrect  = selected === q.correct

  // ── Answer selection ──────────────────────────────────────────────
  const handleSelect = (idx) => {
    if (isAnswered) return
    setSelected(idx)
  }

  // ── Advance to next question or finish ────────────────────────────
  const handleNext = () => {
    const newAnswers = [
      ...answers,
      {
        question : q.question,
        selected,
        correct  : q.correct,
        isCorrect: selected === q.correct,
      },
    ]
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      setQuizDone(true)
    }
  }

  // ── Retry quiz ────────────────────────────────────────────────────
  const handleRetry = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setQuizDone(false)
    // `marked` is intentionally preserved — can't un-complete a lesson
  }

  // ── Mark day complete ─────────────────────────────────────────────
  const handleMarkComplete = () => {
    setMarked(true)
    onMarkComplete?.()
  }

  // ──────────────────────────────────────────────────────────────────
  // RESULTS SCREEN
  // ──────────────────────────────────────────────────────────────────
  if (quizDone) {
    const score    = answers.filter(a => a.isCorrect).length
    const pct      = Math.round((score / questions.length) * 100)
    const passed   = pct >= 70
    const showDone = marked || isComplete

    return (
      <div className="card animate-fade-in">

        {/* Score display */}
        <div className="text-center mb-6">
          <div className={`text-6xl font-black mb-2 ${passed ? 'text-green-400' : 'text-yellow-400'}`}>
            {pct}%
          </div>
          <p className="text-gray-400 text-sm">{score} of {questions.length} correct</p>
          <p className="text-sm text-gray-500 mt-1.5">
            {pct === 100
              ? '🎉 Perfect score!'
              : passed
              ? '✅ Great work — you passed!'
              : '💪 Review the material and try again.'}
          </p>
        </div>

        {/* Per-question result review */}
        <div className="space-y-2 mb-6">
          {answers.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 text-sm p-2 rounded-lg ${
                a.isCorrect ? 'bg-green-950/30' : 'bg-red-950/30'
              }`}
            >
              {a.isCorrect
                ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                : <XCircle     className="w-4 h-4 text-red-400   flex-shrink-0 mt-0.5" />
              }
              <span className="text-gray-300">{a.question}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="space-y-3">

          {/* 1. Mark Day Complete — shown when passed and not yet marked */}
          {passed && !showDone && (
            <button
              onClick={handleMarkComplete}
              className="btn-primary w-full justify-center"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark Day Complete
            </button>
          )}

          {/* 2. Completion confirmed badge */}
          {showDone && (
            <div className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-green-400 bg-green-950/30 rounded-lg border border-green-800/40 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Day marked as complete!
            </div>
          )}

          {/* 3. Next Lesson — appears after marking complete */}
          {showDone && onNextLesson && (
            <button
              onClick={onNextLesson}
              className="btn-primary w-full justify-center animate-fade-in"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* 4. Nudge to retry if not passed */}
          {!passed && (
            <p className="text-center text-xs text-yellow-500 pb-1">
              Score at least 70% to mark this day complete.
            </p>
          )}

          {/* 5. Retry — always available */}
          <button onClick={handleRetry} className="btn-secondary w-full justify-center">
            Retry Quiz
          </button>
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────────────────────────────────
  // QUESTION SCREEN
  // ──────────────────────────────────────────────────────────────────
  return (
    <div className="card animate-fade-in">

      {/* Header + progress bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-gray-300">Quiz</span>
        </div>
        <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
      </div>
      <div className="h-1 bg-gray-800 rounded-full mb-5">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-white font-medium mb-4 leading-relaxed">{q.question}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => {
          let style = 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900 cursor-pointer'
          if (isAnswered) {
            if (idx === q.correct)   style = 'border-green-600 bg-green-950/40 cursor-default'
            else if (idx === selected) style = 'border-red-600 bg-red-950/40 cursor-default'
            else                       style = 'border-gray-800 bg-gray-900/30 opacity-50 cursor-default'
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm text-gray-300 transition-all ${style} flex items-center gap-3`}
            >
              <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs font-bold flex-shrink-0 text-gray-400">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
              {isAnswered && idx === q.correct && (
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              )}
              {isAnswered && idx === selected && idx !== q.correct && (
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {isAnswered && q.explanation && (
        <div
          className={`text-sm p-3 rounded-lg mb-4 ${
            isCorrect
              ? 'bg-green-950/40 text-green-300 border border-green-800/50'
              : 'bg-yellow-950/40 text-yellow-300 border border-yellow-800/50'
          }`}
        >
          <span className="font-semibold">{isCorrect ? '✓ Correct! ' : '✗ Incorrect. '}</span>
          {q.explanation}
        </div>
      )}

      {/* Next Question / See Results */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="btn-primary w-full justify-center animate-fade-in"
        >
          {current < questions.length - 1 ? 'Next Question' : 'See Results'}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
