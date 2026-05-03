import React, { useMemo, useState } from 'react'
import { Check, Copy, Play } from 'lucide-react'
import CodeEditor from './CodeEditor'

function formatExpectedOutput(expectedOutput) {
  if (!expectedOutput) return null
  return String(expectedOutput).trim()
}

export default function StaticCodeBlock({
  code = '',
  title = 'example.py',
  expectedOutput = '',
  height = '220px',
}) {
  const [copied, setCopied] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const displayOutput = useMemo(() => formatExpectedOutput(expectedOutput), [expectedOutput])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  if (interactive) {
    return (
      <CodeEditor
        initialCode={code}
        expectedOutput={expectedOutput}
        title={title}
        height={height}
      />
    )
  }

  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-950 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-500 ml-1 font-mono">python</span>
          <span className="text-xs text-gray-600 ml-2">- {title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setInteractive(true)}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            title="Run this code here"
          >
            <Play className="w-3.5 h-3.5" />
            Run Here
          </button>
          <button onClick={handleCopy} className="btn-ghost text-xs py-1 px-2" title="Copy code">
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <pre
        className="overflow-auto bg-gray-950 p-4 text-sm text-gray-200 font-mono leading-6"
        style={{ maxHeight: height }}
      >
        <code>{code}</code>
      </pre>

      {displayOutput && (
        <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-800 text-xs text-gray-500">
          <span className="text-gray-600">Expected: </span>
          <code className="font-mono text-gray-400 whitespace-pre-wrap">{displayOutput}</code>
        </div>
      )}
    </div>
  )
}
