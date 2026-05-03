import React, { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { Play, RotateCcw, Copy, Check, Loader2, Terminal, ChevronDown, ChevronUp } from 'lucide-react'
import { usePyodide } from '../hooks/usePyodide'

const MonacoEditor = lazy(() => import('@monaco-editor/react'))

export default function CodeEditor({
  initialCode = '',
  expectedOutput = '',
  exerciseId = null,
  title = 'Code Playground',
  height = '280px',
  readOnly = false,
}) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [outputOpen, setOutputOpen] = useState(true)
  const { status, error, initialize, runCode } = usePyodide()
  const editorRef = useRef(null)

  const handleRun = useCallback(async () => {
    if (running) return

    setRunning(true)
    setOutput('')
    setOutputOpen(true)

    try {
      await initialize()

      const lines = []
      const result = await runCode(code, {
        onStdout: (line) => {
          lines.push(line)
          setOutput(lines.join('\n'))
        },
        onStderr: (line) => {
          lines.push(`Warning: ${line}`)
          setOutput(lines.join('\n'))
        },
      })

      if (result.error && !lines.length) {
        setOutput(`Error:\n${result.error}`)
      } else if (!lines.length && result.result !== undefined && result.result !== null) {
        setOutput(String(result.result))
      }
    } catch (err) {
      setOutput(`Error:\n${err?.message || String(err)}`)
    } finally {
      setRunning(false)
    }
  }, [code, initialize, runCode, running])

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun()
    })
  }, [handleRun])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput('')
  }

  const isCorrect = expectedOutput && output.trim() === expectedOutput.trim()

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
          {title && <span className="text-xs text-gray-600 ml-2">- {title}</span>}
        </div>

        <div className="flex items-center gap-1">
          <button onClick={handleCopy} className="btn-ghost text-xs py-1 px-2">
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button onClick={handleReset} className="btn-ghost text-xs py-1 px-2" title="Reset code">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {!readOnly && (
            <button
              onClick={handleRun}
              disabled={running || status === 'loading'}
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ml-1"
            >
              {running ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Running...
                </>
              ) : status === 'loading' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading Python...
                </>
              ) : status === 'idle' ? (
                <>
                  <Play className="w-3.5 h-3.5" /> Load & Run
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Run (Ctrl+Enter)
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <Suspense
        fallback={
          <div
            className="bg-gray-950 text-sm text-gray-500 font-mono p-4"
            style={{ height }}
          >
            Loading editor...
          </div>
        }
      >
        <MonacoEditor
          height={height}
          language="python"
          value={code}
          onMount={handleEditorMount}
          onChange={v => setCode(v || '')}
          theme="vs-dark"
          options={{
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            fontLigatures: true,
            lineHeight: 1.7,
            padding: { top: 14, bottom: 14 },
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            readOnly,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            cursorStyle: 'line',
            smoothScrolling: true,
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
          }}
        />
      </Suspense>

      {!readOnly && (
        <div className="border-t border-gray-700">
          <button
            onClick={() => setOutputOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-900 text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Output
              {isCorrect && <span className="bg-green-900/60 text-green-400 border border-green-700/50 px-2 py-0.5 rounded-full text-xs">Correct</span>}
            </span>
            {outputOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {outputOpen && (
            <div className="bg-gray-950 p-4 font-mono text-sm text-gray-300 min-h-[80px] max-h-48 overflow-y-auto whitespace-pre-wrap">
              {output ? (
                <span className={output.startsWith('Error:') ? 'text-red-400' : 'text-gray-300'}>{output}</span>
              ) : status === 'error' ? (
                <span className="text-red-400">{error}</span>
              ) : (
                <span className="text-gray-600 italic">
                  {status === 'idle' ? 'Python loads on demand. Click Run when you are ready.' : 'Run your code to see output here...'}
                </span>
              )}
            </div>
          )}

          {expectedOutput && (
            <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-800 text-xs text-gray-500">
              <span className="text-gray-600">Expected: </span>
              <code className="font-mono text-gray-400 whitespace-pre-wrap">{expectedOutput}</code>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
