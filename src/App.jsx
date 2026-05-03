import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import LessonPage from './components/LessonPage'
import PhaseOverview from './components/PhaseOverview'

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phase/:phaseId" element={<PhaseOverview />} />
          <Route path="/lesson/:dayId" element={<LessonPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}
