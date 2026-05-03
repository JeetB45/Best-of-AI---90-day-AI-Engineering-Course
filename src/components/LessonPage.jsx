import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, CheckCircle2,
  BookOpen, Code2, HelpCircle, Target, Clock,
  Lightbulb, AlertTriangle, Info, Flame
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { baseCurriculum } from '../data/index'
import CodeEditor from './CodeEditor'
import QuizWidget from './QuizWidget'
import StaticCodeBlock from './StaticCodeBlock'

// ── Lesson content block renderer ───────────────────────────────────
function ContentBlock({ block }) {
  switch (block.type) {
    case 'text':
      return (
        <div
          className="prose-lesson mb-6"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case 'code':
      return (
        <div className="mb-6">
          {block.title && (
            <p className="text-sm font-semibold text-gray-400 mb-2">{block.title}</p>
          )}
          <StaticCodeBlock
            code={block.content}
            expectedOutput={block.expectedOutput}
            title={block.filename || 'example.py'}
            height={block.height || '220px'}
          />
          {block.explanation && (
            <p className="text-sm text-gray-500 mt-2 italic">{block.explanation}</p>
          )}
        </div>
      )

    case 'note':
      return (
        <div className="flex gap-3 bg-blue-950/40 border border-blue-800/50 rounded-xl p-4 mb-5">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200" dangerouslySetInnerHTML={{ __html: block.content }} />
        </div>
      )

    case 'tip':
      return (
        <div className="flex gap-3 bg-green-950/40 border border-green-800/50 rounded-xl p-4 mb-5">
          <Lightbulb className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-200" dangerouslySetInnerHTML={{ __html: block.content }} />
        </div>
      )

    case 'warning':
      return (
        <div className="flex gap-3 bg-yellow-950/40 border border-yellow-800/50 rounded-xl p-4 mb-5">
          <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200" dangerouslySetInnerHTML={{ __html: block.content }} />
        </div>
      )

    case 'heading':
      return (
        <h2 className="text-xl font-bold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
          {block.content}
        </h2>
      )

    case 'subheading':
      return (
        <h3 className="text-base font-semibold text-blue-300 mt-5 mb-2">{block.content}</h3>
      )

    case 'exercise':
      return (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-400">Exercise: {block.title}</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">{block.description}</p>
          <CodeEditor
            initialCode={block.starterCode}
            expectedOutput={block.expectedOutput}
            title={`exercise_${block.id || 1}.py`}
            height="220px"
          />
          {block.hint && (
            <details className="mt-2">
              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300">
                💡 Show hint
              </summary>
              <p className="text-xs text-gray-400 mt-1 pl-4">{block.hint}</p>
            </details>
          )}
        </div>
      )

    default:
      return null
  }
}

// ── Tab definitions ─────────────────────────────────────────────────
const TABS = [
  { id: 'lesson',   label: 'Lesson',   icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Code2 },
  { id: 'quiz',     label: 'Quiz',     icon: HelpCircle },
]

const PHASE_COLORS = {
  1: 'text-blue-400',
  2: 'text-purple-400',
  3: 'text-green-400',
  4: 'text-yellow-400',
  5: 'text-orange-400',
  6: 'text-red-400',
}

export default function LessonPage() {
  const { dayId } = useParams()
  const day = parseInt(dayId)
  const navigate = useNavigate()
  const { isComplete, markLessonComplete } = useApp()

  const lesson     = baseCurriculum.find(l => l.day === day)
  const prevLesson = baseCurriculum.find(l => l.day === day - 1)
  const nextLesson = baseCurriculum.find(l => l.day === day + 1)

  const [tab, setTab] = useState('lesson')
  const done = isComplete(day)

  // Reset to lesson tab and scroll to top on day change
  useEffect(() => {
    window.scrollTo(0, 0)
    setTab('lesson')
  }, [day])

  // Switch tab AND scroll to top — used by Continue buttons
  const goToTab = (tabId) => {
    setTab(tabId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
        <p>Lesson not found for Day {day}.</p>
        <Link to="/" className="btn-secondary">← Back to Home</Link>
      </div>
    )
  }

  const hasQuiz      = lesson.quiz?.length > 0
  const hasExercises = lesson.exercises?.length > 0
  const phaseColor   = PHASE_COLORS[lesson.phase] || 'text-blue-400'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
        <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
        <span>/</span>
        <Link
          to={`/phase/${lesson.phase}`}
          className={`hover:text-gray-400 transition-colors ${phaseColor}`}
        >
          Phase {lesson.phase}
        </Link>
        <span>/</span>
        <span className="text-gray-500">Day {day}</span>
      </div>

      {/* Lesson header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className={`tag bg-gray-800 ${phaseColor} font-mono`}>Day {day}</span>
          {lesson.duration && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" /> {lesson.duration}
            </span>
          )}
          {done && (
            <span className="flex items-center gap-1 text-xs text-green-400 font-semibold ml-auto">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl font-black text-white mb-4 leading-tight">{lesson.title}</h1>

        {/* Objectives */}
        {lesson.objectives?.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-gray-300">Learning Objectives</span>
            </div>
            <ul className="space-y-1.5">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-blue-500 mt-0.5">›</span> {obj}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-900 p-1 rounded-xl mb-8 border border-gray-800">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {id === 'quiz' && done && (
                <CheckCircle2 className="w-3 h-3 text-green-400" />
              )}
            </button>
          )
        })}
      </div>

      {/* ── LESSON TAB ──────────────────────────────────────────── */}
      {tab === 'lesson' && (
        <div className="animate-fade-in">
          {lesson.content?.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          {/* Continue to Practice */}
          <div className="mt-10 pt-6 border-t border-gray-800 flex justify-end">
            <button
              onClick={() => goToTab('practice')}
              className="btn-primary"
            >
              Continue to Practice <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── PRACTICE TAB ────────────────────────────────────────── */}
      {tab === 'practice' && (
        <div className="animate-fade-in space-y-8">
          {hasExercises ? (
            lesson.exercises.map((ex, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-orange-600/20 border border-orange-700/50 flex items-center justify-center text-xs font-bold text-orange-400">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">{ex.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">{ex.description}</p>
                <CodeEditor
                  initialCode={ex.starterCode}
                  expectedOutput={ex.expectedOutput}
                  title={`exercise${i + 1}.py`}
                  height="240px"
                  exerciseId={`${day}-${i}`}
                />
                {ex.hint && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300">
                      💡 Show hint
                    </summary>
                    <p className="text-xs text-gray-400 mt-1.5 pl-3 border-l border-gray-700">
                      {ex.hint}
                    </p>
                  </details>
                )}
                {ex.solution && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-400">
                      👁 Show solution
                    </summary>
                    <StaticCodeBlock
                      code={ex.solution}
                      title="solution.py"
                      height="200px"
                    />
                  </details>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Code2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="mb-6">Use the free editor below to practice what you learned today.</p>
              <CodeEditor
                initialCode={`# Free practice — Day ${day}\n# Write whatever you want here!\n\nprint("Let's code!")\n`}
                title="playground.py"
                height="280px"
              />
            </div>
          )}

          {/* Continue to Quiz (or Mark Complete if no quiz) */}
          <div className="pt-6 border-t border-gray-800 flex justify-end">
            {hasQuiz ? (
              <button
                onClick={() => goToTab('quiz')}
                className="btn-primary"
              >
                Continue to Quiz <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              // No quiz — let user mark complete from here
              <button
                onClick={() => {
                  markLessonComplete(day)
                  if (nextLesson) navigate(`/lesson/${nextLesson.day}`)
                }}
                disabled={done}
                className={done ? 'btn-secondary opacity-60 cursor-default' : 'btn-primary'}
              >
                <CheckCircle2 className="w-4 h-4" />
                {done ? 'Already Completed' : 'Mark Complete'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── QUIZ TAB ────────────────────────────────────────────── */}
      {tab === 'quiz' && (
        <div className="animate-fade-in">
          {hasQuiz ? (
            <QuizWidget
              key={day}
              questions={lesson.quiz}
              isComplete={done}
              onMarkComplete={() => markLessonComplete(day)}
              onNextLesson={nextLesson ? () => navigate(`/lesson/${nextLesson.day}`) : null}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No quiz available for this lesson.</p>
            </div>
          )}
        </div>
      )}

      {/* ── Bottom navigation (Prev / Next lesson) ──────────────── */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-800">
        <div>
          {prevLesson ? (
            <button
              onClick={() => navigate(`/lesson/${prevLesson.day}`)}
              className="btn-secondary"
            >
              <ChevronLeft className="w-4 h-4" /> Day {prevLesson.day}
            </button>
          ) : (
            <div />
          )}
        </div>
        <div>
          {nextLesson && (
            <button
              onClick={() => navigate(`/lesson/${nextLesson.day}`)}
              className={done ? 'btn-primary' : 'btn-secondary'}
            >
              Day {nextLesson.day} <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
