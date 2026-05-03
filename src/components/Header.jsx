import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Bot, Key, ChevronDown, CheckCircle2, Circle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { usePyodide } from '../hooks/usePyodide'

const PROVIDERS = [
  { id: 'gemini', label: 'Gemini (Vertex AI)', placeholder: 'AIza...' },
  { id: 'openai', label: 'OpenAI', placeholder: 'sk-...' },
  { id: 'huggingface', label: 'HuggingFace', placeholder: 'hf_...' },
]

function ApiKeyModal({ onClose }) {
  const { setApiKey, getApiKey } = useApp()
  const [values, setValues] = useState(() =>
    Object.fromEntries(PROVIDERS.map(p => [p.id, getApiKey(p.id)]))
  )

  const handleSave = () => {
    PROVIDERS.forEach(p => { if (values[p.id]) setApiKey(p.id, values[p.id]) })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">API Keys</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-5 bg-blue-950/50 border border-blue-900/50 rounded-lg p-3">
          🔐 Keys are stored <strong className="text-blue-300">only in your browser's session</strong> — never sent to our servers. They're cleared when you close the tab.
        </p>

        <div className="space-y-4">
          {PROVIDERS.map(p => (
            <div key={p.id}>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{p.label}</label>
              <input
                type="password"
                value={values[p.id]}
                onChange={e => setValues(prev => ({ ...prev, [p.id]: e.target.value }))}
                placeholder={p.placeholder}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 font-mono placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary flex-1 justify-center">Save Keys</button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const { sidebarOpen, setSidebarOpen, totalCompleted } = useApp()
  const { status: pyodideStatus } = usePyodide()
  const [showKeys, setShowKeys] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="h-14 bg-gray-950 border-b border-gray-800 flex items-center px-4 gap-3 flex-shrink-0 z-10">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="text-gray-400 hover:text-white transition-colors p-1"
          title="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2 font-bold text-white">
          <Bot className="w-6 h-6 text-blue-400" />
          <span className="hidden sm:block">BestofAI</span>
        </Link>

        <div className="flex-1" />

        {/* Pyodide status */}
        <div className="flex items-center gap-1.5 text-xs">
          {pyodideStatus === 'ready' ? (
            <span className="flex items-center gap-1.5 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
              Python Ready
            </span>
          ) : pyodideStatus === 'loading' ? (
            <span className="flex items-center gap-1.5 text-yellow-500">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Loading Python...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-gray-500" />
              Python On Demand
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          <span><span className="text-white font-semibold">{totalCompleted}</span>/90 days</span>
        </div>

        <button
          onClick={() => setShowKeys(true)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 bg-gray-900 border border-gray-800 hover:border-yellow-700 px-3 py-1.5 rounded-full transition-colors"
        >
          <Key className="w-3.5 h-3.5" />
          <span className="hidden sm:block">API Keys</span>
        </button>
      </header>

      {showKeys && <ApiKeyModal onClose={() => setShowKeys(false)} />}
    </>
  )
}
