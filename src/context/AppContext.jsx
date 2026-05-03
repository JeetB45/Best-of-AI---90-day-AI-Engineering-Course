import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { baseCurriculum, phase7Data } from '../data/index'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('boai_progress')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = sessionStorage.getItem('boai_keys')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Persist progress
  useEffect(() => {
    localStorage.setItem('boai_progress', JSON.stringify(progress))
  }, [progress])

  // Persist API keys
  useEffect(() => {
    sessionStorage.setItem('boai_keys', JSON.stringify(apiKeys))
  }, [apiKeys])

  // Mark complete
  const markLessonComplete = useCallback((dayId) => {
    setProgress((prev) => ({
      ...prev,
      [dayId]: {
        completed: true,
        completedAt: new Date().toISOString(),
      },
    }))
  }, [])

  // Mark incomplete
  const markLessonIncomplete = useCallback((dayId) => {
    setProgress((prev) => {
      const next = { ...prev }
      delete next[dayId]
      return next
    })
  }, [])

  const isComplete = useCallback(
    (dayId) => !!progress[dayId]?.completed,
    [progress]
  )

  // Count only base 90 days
  const totalCompleted = useMemo(() => {
    return baseCurriculum.filter((l) => progress[l.day]?.completed).length
  }, [progress, baseCurriculum])

  // Unlock condition
  const isPhase7Unlocked = totalCompleted >= 90

  // Dynamic curriculum
  const fullCurriculum = useMemo(() => {
    if (isPhase7Unlocked) {
      return [...baseCurriculum, ...phase7Data]
    }
    return baseCurriculum
  }, [isPhase7Unlocked])

  // Group by phase
  const lessonsByPhase = useMemo(() => {
    return fullCurriculum.reduce((acc, lesson) => {
      if (!acc[lesson.phase]) acc[lesson.phase] = []
      acc[lesson.phase].push(lesson)
      return acc
    }, {})
  }, [fullCurriculum])

  // Phase progress
  const phaseProgress = useCallback(
    (phaseId) => {
      const phaseDays = lessonsByPhase[phaseId] || []
      const done = phaseDays.filter((l) => isComplete(l.day)).length
      return {
        done,
        total: phaseDays.length,
        pct:
          phaseDays.length > 0
            ? Math.round((done / phaseDays.length) * 100)
            : 0,
      }
    },
    [isComplete, lessonsByPhase]
  )

  // API keys
  const setApiKey = useCallback((provider, key) => {
    setApiKeys((prev) => ({ ...prev, [provider]: key }))
  }, [])

  const getApiKey = useCallback(
    (provider) => apiKeys[provider] || '',
    [apiKeys]
  )

  const value = useMemo(
    () => ({
      progress,
      markLessonComplete,
      markLessonIncomplete,
      isComplete,
      totalCompleted,
      phaseProgress,
      apiKeys,
      setApiKey,
      getApiKey,
      sidebarOpen,
      setSidebarOpen,
      curriculum: fullCurriculum,
      isPhase7Unlocked,
      lessonsByPhase,
    }),
    [
      progress,
      markLessonComplete,
      markLessonIncomplete,
      isComplete,
      totalCompleted,
      phaseProgress,
      apiKeys,
      setApiKey,
      getApiKey,
      sidebarOpen,
      lessonsByPhase,
      fullCurriculum,
      isPhase7Unlocked,
    ]
  )

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}