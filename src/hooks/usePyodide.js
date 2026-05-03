import { useState, useEffect, useCallback } from 'react'

let pyodideInstance = null
let loadingPromise = null
let pyodideStatus = 'idle'
let pyodideError = null
const listeners = new Set()

function notifyListeners() {
  const snapshot = { status: pyodideStatus, error: pyodideError }
  listeners.forEach(listener => listener(snapshot))
}

async function initializePyodide() {
  if (pyodideInstance) return pyodideInstance
  if (loadingPromise) return loadingPromise

  pyodideStatus = 'loading'
  pyodideError = null
  notifyListeners()

  loadingPromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const py = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
      stdout: () => {},
      stderr: () => {},
    })

    await py.loadPackagesFromImports(`
import micropip
    `)

    pyodideInstance = py
    pyodideStatus = 'ready'
    notifyListeners()
    return py
  })().catch(err => {
    loadingPromise = null
    pyodideStatus = 'error'
    pyodideError = err?.message || String(err)
    notifyListeners()
    throw err
  })

  return loadingPromise
}

export function usePyodide() {
  const [status, setStatus] = useState(pyodideStatus)
  const [error, setError] = useState(pyodideError)

  useEffect(() => {
    const listener = ({ status: nextStatus, error: nextError }) => {
      setStatus(nextStatus)
      setError(nextError)
    }

    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const initialize = useCallback(() => initializePyodide(), [])

  const runCode = useCallback(async (code, { onStdout, onStderr } = {}) => {
    const py = pyodideInstance || await initializePyodide()
    const outputLines = []
    const errorLines = []

    py.setStdout({
      batched: (line) => {
        outputLines.push(line)
        onStdout?.(line)
      },
    })
    py.setStderr({
      batched: (line) => {
        errorLines.push(line)
        onStderr?.(line)
      },
    })

    try {
      await py.loadPackagesFromImports(code)
    } catch (_) {
      // Import discovery is best-effort; execution errors surface below.
    }

    let result = null
    let execError = null

    try {
      result = await py.runPythonAsync(code)
    } catch (err) {
      execError = err?.message || String(err)
      errorLines.push(execError)
    }

    py.setStdout({ batched: () => {} })
    py.setStderr({ batched: () => {} })

    return {
      stdout: outputLines.join('\n'),
      stderr: errorLines.join('\n'),
      result,
      error: execError,
      success: !execError,
    }
  }, [])

  return {
    status,
    error,
    initialize,
    runCode,
    isReady: status === 'ready',
  }
}
