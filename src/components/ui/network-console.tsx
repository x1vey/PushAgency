import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Terminal,
    X,
    ChevronDown,
    ChevronRight,
    Wifi,
    WifiOff,
    Clock,
    ArrowUpRight,
    ArrowDownLeft,
    Trash2,
    Pause,
    Play,
    Filter,
    Copy,
    Check,
    Minimize2,
    Maximize2
} from 'lucide-react'

// Types
export interface NetworkLog {
    id: string
    timestamp: Date
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
    url: string
    status?: number
    statusText?: string
    duration?: number
    requestHeaders?: Record<string, string>
    responseHeaders?: Record<string, string>
    requestBody?: unknown
    responseBody?: unknown
    error?: string
    type: 'fetch' | 'xhr'
    state: 'pending' | 'success' | 'error'
}

// Global store for network logs
let networkLogs: NetworkLog[] = []
let listeners: Set<() => void> = new Set()
let isPaused = false

const notifyListeners = () => {
    listeners.forEach(listener => listener())
}

export const addNetworkLog = (log: NetworkLog) => {
    if (isPaused) return
    networkLogs = [log, ...networkLogs].slice(0, 100) // Keep last 100 logs
    notifyListeners()
}

export const updateNetworkLog = (id: string, updates: Partial<NetworkLog>) => {
    networkLogs = networkLogs.map(log =>
        log.id === id ? { ...log, ...updates } : log
    )
    notifyListeners()
}

export const clearNetworkLogs = () => {
    networkLogs = []
    notifyListeners()
}

export const togglePause = () => {
    isPaused = !isPaused
    return isPaused
}

// Hook to subscribe to network logs
const useNetworkLogs = () => {
    const [logs, setLogs] = useState<NetworkLog[]>(networkLogs)

    useEffect(() => {
        const listener = () => setLogs([...networkLogs])
        listeners.add(listener)
        return () => { listeners.delete(listener) }
    }, [])

    return logs
}

// Intercept fetch
const originalFetch = window.fetch
window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const id = crypto.randomUUID()
    const startTime = performance.now()
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    const method = (init?.method?.toUpperCase() || 'GET') as NetworkLog['method']

    // Parse request headers
    const requestHeaders: Record<string, string> = {}
    if (init?.headers) {
        if (init.headers instanceof Headers) {
            init.headers.forEach((value, key) => {
                requestHeaders[key] = value
            })
        } else if (Array.isArray(init.headers)) {
            init.headers.forEach(([key, value]) => {
                requestHeaders[key] = value
            })
        } else {
            Object.entries(init.headers).forEach(([key, value]) => {
                requestHeaders[key] = value
            })
        }
    }

    // Parse request body
    let requestBody: unknown
    if (init?.body) {
        try {
            if (typeof init.body === 'string') {
                requestBody = JSON.parse(init.body)
            } else {
                requestBody = init.body
            }
        } catch {
            requestBody = init.body
        }
    }

    addNetworkLog({
        id,
        timestamp: new Date(),
        method,
        url,
        type: 'fetch',
        state: 'pending',
        requestHeaders,
        requestBody
    })

    try {
        const response = await originalFetch(input, init)
        const duration = performance.now() - startTime

        // Parse response headers
        const responseHeaders: Record<string, string> = {}
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value
        })

        // Clone response to read body without consuming it
        const clonedResponse = response.clone()
        let responseBody: unknown
        try {
            const contentType = response.headers.get('content-type')
            if (contentType?.includes('application/json')) {
                responseBody = await clonedResponse.json()
            } else if (contentType?.includes('text/')) {
                responseBody = await clonedResponse.text()
            }
        } catch {
            // Ignore body parsing errors
        }

        updateNetworkLog(id, {
            status: response.status,
            statusText: response.statusText,
            duration,
            responseHeaders,
            responseBody,
            state: response.ok ? 'success' : 'error'
        })

        return response
    } catch (error) {
        const duration = performance.now() - startTime
        updateNetworkLog(id, {
            duration,
            error: error instanceof Error ? error.message : 'Network error',
            state: 'error'
        })
        throw error
    }
}

// Intercept XMLHttpRequest
const OriginalXHR = window.XMLHttpRequest
class InterceptedXHR extends OriginalXHR {
    private _id: string = ''
    private _startTime: number = 0
    private _method: string = 'GET'
    private _url: string = ''
    private _requestHeaders: Record<string, string> = {}
    private _requestBody: unknown

    open(method: string, url: string | URL, async: boolean = true, username?: string | null, password?: string | null) {
        this._id = crypto.randomUUID()
        this._method = method.toUpperCase()
        this._url = typeof url === 'string' ? url : url.href
        super.open(method, url, async, username, password)
    }

    setRequestHeader(name: string, value: string) {
        this._requestHeaders[name] = value
        super.setRequestHeader(name, value)
    }

    send(body?: Document | XMLHttpRequestBodyInit | null) {
        this._startTime = performance.now()

        if (body) {
            try {
                if (typeof body === 'string') {
                    this._requestBody = JSON.parse(body)
                } else {
                    this._requestBody = body
                }
            } catch {
                this._requestBody = body
            }
        }

        addNetworkLog({
            id: this._id,
            timestamp: new Date(),
            method: this._method as NetworkLog['method'],
            url: this._url,
            type: 'xhr',
            state: 'pending',
            requestHeaders: this._requestHeaders,
            requestBody: this._requestBody
        })

        this.addEventListener('load', () => {
            const duration = performance.now() - this._startTime

            // Parse response headers
            const responseHeaders: Record<string, string> = {}
            const headerLines = this.getAllResponseHeaders().trim().split(/[\r\n]+/)
            headerLines.forEach(line => {
                const parts = line.split(': ')
                const key = parts.shift()
                const value = parts.join(': ')
                if (key) responseHeaders[key] = value
            })

            // Parse response body
            let responseBody: unknown
            try {
                const contentType = this.getResponseHeader('content-type')
                if (contentType?.includes('application/json')) {
                    responseBody = JSON.parse(this.responseText)
                } else if (contentType?.includes('text/')) {
                    responseBody = this.responseText
                }
            } catch {
                responseBody = this.responseText
            }

            updateNetworkLog(this._id, {
                status: this.status,
                statusText: this.statusText,
                duration,
                responseHeaders,
                responseBody,
                state: this.status >= 200 && this.status < 400 ? 'success' : 'error'
            })
        })

        this.addEventListener('error', () => {
            const duration = performance.now() - this._startTime
            updateNetworkLog(this._id, {
                duration,
                error: 'Network error',
                state: 'error'
            })
        })

        this.addEventListener('timeout', () => {
            const duration = performance.now() - this._startTime
            updateNetworkLog(this._id, {
                duration,
                error: 'Request timeout',
                state: 'error'
            })
        })

        super.send(body)
    }
}
window.XMLHttpRequest = InterceptedXHR as unknown as typeof XMLHttpRequest

// Status badge component
const StatusBadge = ({ status, state }: { status?: number; state: NetworkLog['state'] }) => {
    if (state === 'pending') {
        return (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Pending
            </span>
        )
    }

    if (!status) {
        return (
            <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Error
            </span>
        )
    }

    const getStatusColor = (code: number) => {
        if (code >= 200 && code < 300) return 'text-emerald-600 bg-emerald-500'
        if (code >= 300 && code < 400) return 'text-blue-600 bg-blue-500'
        if (code >= 400 && code < 500) return 'text-amber-600 bg-amber-500'
        return 'text-red-600 bg-red-500'
    }

    const [textColor, dotColor] = getStatusColor(status).split(' ')

    return (
        <span className={`flex items-center gap-1.5 text-xs font-medium ${textColor}`}>
            <div className={`w-2 h-2 rounded-full ${dotColor}`} />
            {status}
        </span>
    )
}

// Method badge component
const MethodBadge = ({ method }: { method: NetworkLog['method'] }) => {
    const colors: Record<string, string> = {
        GET: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        POST: 'bg-blue-100 text-blue-700 border-blue-200',
        PUT: 'bg-amber-100 text-amber-700 border-amber-200',
        DELETE: 'bg-red-100 text-red-700 border-red-200',
        PATCH: 'bg-purple-100 text-purple-700 border-purple-200',
        OPTIONS: 'bg-gray-100 text-gray-700 border-gray-200',
        HEAD: 'bg-gray-100 text-gray-700 border-gray-200'
    }

    return (
        <span className={`px-2 py-0.5 text-xs font-bold rounded border ${colors[method] || colors.GET}`}>
            {method}
        </span>
    )
}

// Log item component
const LogItem = ({ log, isExpanded, onToggle }: {
    log: NetworkLog
    isExpanded: boolean
    onToggle: () => void
}) => {
    const [copied, setCopied] = useState(false)

    const formatUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url, window.location.origin)
            return parsedUrl.pathname + parsedUrl.search
        } catch {
            return url
        }
    }

    const formatDuration = (ms?: number) => {
        if (!ms) return '-'
        if (ms < 1000) return `${Math.round(ms)}ms`
        return `${(ms / 1000).toFixed(2)}s`
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour12: false })
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`border-b border-gray-100 last:border-b-0 ${log.state === 'error' ? 'bg-red-50/50' : ''
                }`}
        >
            {/* Summary row */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
            >
                <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </motion.div>

                <span className="text-xs text-gray-400 font-mono w-20 shrink-0">
                    {formatTime(log.timestamp)}
                </span>

                <MethodBadge method={log.method} />

                <StatusBadge status={log.status} state={log.state} />

                <span className="text-sm text-gray-700 font-mono truncate flex-1" title={log.url}>
                    {formatUrl(log.url)}
                </span>

                <span className="text-xs text-gray-400 font-mono w-16 text-right shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(log.duration)}
                </span>

                <span className={`text-xs px-1.5 py-0.5 rounded ${log.type === 'fetch' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {log.type}
                </span>
            </button>

            {/* Expanded details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 py-3 bg-gray-50 space-y-3 border-t border-gray-100">
                            {/* URL */}
                            <div className="flex items-start gap-2">
                                <span className="text-xs font-medium text-gray-500 w-20 shrink-0">URL</span>
                                <div className="flex-1 flex items-center gap-2">
                                    <code className="text-xs text-gray-700 break-all">{log.url}</code>
                                    <button
                                        onClick={() => copyToClipboard(log.url)}
                                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    >
                                        {copied ? (
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-3 h-3 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {log.error && (
                                <div className="flex items-start gap-2">
                                    <span className="text-xs font-medium text-red-500 w-20 shrink-0">Error</span>
                                    <code className="text-xs text-red-600">{log.error}</code>
                                </div>
                            )}

                            {/* Request Headers */}
                            {log.requestHeaders && Object.keys(log.requestHeaders).length > 0 && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <ArrowUpRight className="w-3 h-3" />
                                        Request Headers
                                    </div>
                                    <pre className="text-xs text-gray-600 bg-white rounded p-2 overflow-x-auto border border-gray-200">
                                        {JSON.stringify(log.requestHeaders, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {/* Request Body */}
                            {log.requestBody && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <ArrowUpRight className="w-3 h-3" />
                                        Request Body
                                    </div>
                                    <pre className="text-xs text-gray-600 bg-white rounded p-2 overflow-x-auto border border-gray-200 max-h-40">
                                        {typeof log.requestBody === 'string'
                                            ? log.requestBody
                                            : JSON.stringify(log.requestBody, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {/* Response Headers */}
                            {log.responseHeaders && Object.keys(log.responseHeaders).length > 0 && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <ArrowDownLeft className="w-3 h-3" />
                                        Response Headers
                                    </div>
                                    <pre className="text-xs text-gray-600 bg-white rounded p-2 overflow-x-auto border border-gray-200">
                                        {JSON.stringify(log.responseHeaders, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {/* Response Body */}
                            {log.responseBody && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <ArrowDownLeft className="w-3 h-3" />
                                        Response Body
                                    </div>
                                    <pre className="text-xs text-gray-600 bg-white rounded p-2 overflow-x-auto border border-gray-200 max-h-40">
                                        {typeof log.responseBody === 'string'
                                            ? log.responseBody
                                            : JSON.stringify(log.responseBody, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// Main Network Console Component
export const NetworkConsole = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [paused, setPaused] = useState(false)
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
    const [filter, setFilter] = useState<'all' | 'fetch' | 'xhr'>('all')
    const [methodFilter, setMethodFilter] = useState<string>('all')
    const logs = useNetworkLogs()
    const consoleRef = useRef<HTMLDivElement>(null)

    const filteredLogs = logs.filter(log => {
        if (filter !== 'all' && log.type !== filter) return false
        if (methodFilter !== 'all' && log.method !== methodFilter) return false
        return true
    })

    const toggleExpanded = (id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    const handlePauseToggle = () => {
        const newState = togglePause()
        setPaused(newState)
    }

    const pendingCount = logs.filter(l => l.state === 'pending').length
    const errorCount = logs.filter(l => l.state === 'error').length

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] w-12 h-12 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Terminal className="w-5 h-5" />
                {(pendingCount > 0 || errorCount > 0) && (
                    <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${errorCount > 0 ? 'bg-red-500' : 'bg-amber-500'
                        }`}>
                        {errorCount || pendingCount}
                    </span>
                )}
                <span className="absolute right-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Network Console
                </span>
            </motion.button>

            {/* Console Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={consoleRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '60vh'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-6 z-[9998] w-[90vw] max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {pendingCount > 0 ? (
                                        <Wifi className="w-4 h-4 text-amber-500 animate-pulse" />
                                    ) : (
                                        <Wifi className="w-4 h-4 text-gray-400" />
                                    )}
                                    <h3 className="font-bold text-gray-800">Network Console</h3>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                    {filteredLogs.length} requests
                                </span>
                                {errorCount > 0 && (
                                    <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                        {errorCount} errors
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handlePauseToggle}
                                    className={`p-2 rounded-lg transition-colors ${paused ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100 text-gray-500'
                                        }`}
                                    title={paused ? 'Resume logging' : 'Pause logging'}
                                >
                                    {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={clearNetworkLogs}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                                    title="Clear logs"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                                    title={isMinimized ? 'Expand' : 'Minimize'}
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                                    title="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        {!isMinimized && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50/50 border-b border-gray-100">
                                <Filter className="w-4 h-4 text-gray-400" />

                                {/* Type filter */}
                                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
                                    {(['all', 'fetch', 'xhr'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setFilter(type)}
                                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${filter === type
                                                    ? 'bg-black text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {type === 'all' ? 'All' : type.toUpperCase()}
                                        </button>
                                    ))}
                                </div>

                                {/* Method filter */}
                                <select
                                    value={methodFilter}
                                    onChange={(e) => setMethodFilter(e.target.value)}
                                    className="px-2 py-1 text-xs font-medium bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5"
                                >
                                    <option value="all">All Methods</option>
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                    <option value="PATCH">PATCH</option>
                                </select>
                            </div>
                        )}

                        {/* Logs */}
                        {!isMinimized && (
                            <div className="flex-1 overflow-y-auto">
                                {filteredLogs.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-gray-400">
                                        <WifiOff className="w-10 h-10 mb-3" />
                                        <p className="text-sm font-medium">No network requests yet</p>
                                        <p className="text-xs mt-1">Requests will appear here as they happen</p>
                                    </div>
                                ) : (
                                    <AnimatePresence>
                                        {filteredLogs.map((log) => (
                                            <LogItem
                                                key={log.id}
                                                log={log}
                                                isExpanded={expandedIds.has(log.id)}
                                                onToggle={() => toggleExpanded(log.id)}
                                            />
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default NetworkConsole
