import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Bell,
    Send,
    Search,
    Filter,
    Plus,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronDown,
    Sparkles,
    Users,
    TrendingUp,
    Activity,
    ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spotlight } from '@/components/ui/spotlight'
import { Badge } from '@/components/ui/badge'

// Types
interface Notification {
    id: string
    title: string
    message: string
    status: 'sent' | 'scheduled' | 'draft' | 'failed'
    sentAt?: Date
    scheduledFor?: Date
    audienceCount: number
    openRate?: number
    clickRate?: number
}

interface NotificationStats {
    totalSent: number
    avgOpenRate: number
    avgClickRate: number
    activeSubscribers: number
}

// Mock Data
const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'New Feature Launch! 🚀',
        message: 'We just released our new automation dashboard. Check it out now and boost your productivity!',
        status: 'sent',
        sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        audienceCount: 12540,
        openRate: 68.5,
        clickRate: 24.3
    },
    {
        id: '2',
        title: 'Weekly Tips: Automation Mastery',
        message: 'Learn how to save 10+ hours per week with these 5 automation tips...',
        status: 'scheduled',
        scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000),
        audienceCount: 8920
    },
    {
        id: '3',
        title: 'Flash Sale - 50% Off',
        message: 'Limited time offer on our premium plans. Upgrade now!',
        status: 'sent',
        sentAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
        audienceCount: 15230,
        openRate: 72.1,
        clickRate: 31.8
    },
    {
        id: '4',
        title: 'System Maintenance Notice',
        message: 'Scheduled maintenance on Sunday 2AM-4AM EST.',
        status: 'draft',
        audienceCount: 0
    },
    {
        id: '5',
        title: 'Holiday Special Campaign',
        message: 'Celebrate with exclusive holiday discounts...',
        status: 'failed',
        sentAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
        audienceCount: 5000
    }
]

const mockStats: NotificationStats = {
    totalSent: 156,
    avgOpenRate: 67.2,
    avgClickRate: 22.8,
    activeSubscribers: 45230
}

// Status badge component
const StatusBadge = ({ status }: { status: Notification['status'] }) => {
    const configs = {
        sent: { icon: CheckCircle2, label: 'Sent', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        scheduled: { icon: Clock, label: 'Scheduled', className: 'bg-amber-100 text-amber-700 border-amber-200' },
        draft: { icon: Sparkles, label: 'Draft', className: 'bg-blue-100 text-blue-700 border-blue-200' },
        failed: { icon: XCircle, label: 'Failed', className: 'bg-red-100 text-red-700 border-red-200' }
    }

    const config = configs[status]
    const Icon = config.icon

    return (
        <Badge className={`${config.className} border flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-none`}>
            <Icon className="w-3 h-3" />
            {config.label}
        </Badge>
    )
}

// Stat Card Component
const StatCard = ({
    icon: Icon,
    label,
    value,
    suffix = '',
    trend,
    delay = 0
}: {
    icon: typeof Send
    label: string
    value: number | string
    suffix?: string
    trend?: number
    delay?: number
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-black/5 overflow-hidden relative rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-5 relative">
                <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-full bg-black/5 text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-black/10 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                    </div>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <p className="text-2xl font-bold text-black">
                        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
)

// Notification Item Component
const NotificationItem = ({
    notification,
    index
}: {
    notification: Notification
    index: number
}) => {
    const formatDate = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))

        if (hours < 1) return 'Just now'
        if (hours < 24) return `${hours}h ago`
        const days = Math.floor(hours / 24)
        if (days === 1) return 'Yesterday'
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const formatFutureDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="group"
        >
            <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50/50 cursor-pointer overflow-hidden rounded-3xl">
                <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className="hidden sm:flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center shrink-0">
                            <Bell className="w-5 h-5 text-gray-600" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                <h4 className="font-bold text-black truncate">{notification.title}</h4>
                                <StatusBadge status={notification.status} />
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{notification.message}</p>

                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                                <span className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5" />
                                    {notification.audienceCount.toLocaleString()} recipients
                                </span>

                                {notification.status === 'sent' && notification.sentAt && (
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatDate(notification.sentAt)}
                                    </span>
                                )}

                                {notification.status === 'scheduled' && notification.scheduledFor && (
                                    <span className="flex items-center gap-1.5 text-amber-600">
                                        <Clock className="w-3.5 h-3.5" />
                                        Scheduled: {formatFutureDate(notification.scheduledFor)}
                                    </span>
                                )}

                                {notification.openRate !== undefined && (
                                    <span className="flex items-center gap-1.5 text-emerald-600">
                                        <Activity className="w-3.5 h-3.5" />
                                        {notification.openRate}% opened
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-8 px-3 text-gray-500 hover:text-black rounded-full">
                                View
                            </Button>
                            {notification.status === 'draft' && (
                                <Button size="sm" className="h-8 px-3 bg-black hover:bg-black/80 text-white rounded-full">
                                    <Send className="w-3.5 h-3.5 mr-1.5" />
                                    Send
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Send Notification Card Component
const SendNotificationCard = ({ onClose }: { onClose?: () => void }) => {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [isScheduled, setIsScheduled] = useState(false)
    const characterLimit = 160

    return (
        <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-white border-gray-200 overflow-hidden shadow-xl rounded-3xl">
                <div className="absolute inset-0 bg-white/50" />
                <CardHeader className="relative pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                            <Send className="w-5 h-5 text-black" />
                        </div>
                        Create New Push Notification
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notification Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a catchy title..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                            maxLength={80}
                        />
                        <p className="text-xs text-gray-400 mt-1.5">{title.length}/80 characters</p>
                    </div>

                    {/* Message Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message Body
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your notification message..."
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
                            maxLength={characterLimit}
                        />
                        <p className={`text-xs mt-1.5 ${message.length > characterLimit * 0.9 ? 'text-amber-500' : 'text-gray-400'}`}>
                            {message.length}/{characterLimit} characters
                        </p>
                    </div>

                    {/* Schedule Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsScheduled(!isScheduled)}
                            className={`
                                relative w-12 h-6 rounded-full transition-all duration-300
                                ${isScheduled ? 'bg-black' : 'bg-gray-200'}
                            `}
                        >
                            <motion.div
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                animate={{ left: isScheduled ? '28px' : '4px' }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className="text-sm text-gray-600">Schedule for later</span>
                    </div>

                    {/* Schedule Input */}
                    <AnimatePresence>
                        {isScheduled && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <input
                                    type="datetime-local"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                            className="flex-1 bg-black hover:bg-black/90 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                            disabled={!title || !message}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            {isScheduled ? 'Schedule Notification' : 'Send Now'}
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-full"
                            onClick={onClose}
                        >
                            Save as Draft
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Main Page Component
const NotificationsPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const filterRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilterDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Filter notifications
    const filteredNotifications = mockNotifications.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'all' || n.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const filterOptions = [
        { value: 'all', label: 'All Notifications' },
        { value: 'sent', label: 'Sent' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'draft', label: 'Drafts' },
        { value: 'failed', label: 'Failed' }
    ]

    return (
        <div className="min-h-screen bg-white font-sans text-black">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E5E7EB" />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-gray-400 hover:text-black transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                                    <Bell className="w-4 h-4 text-black" />
                                </div>
                                <h1 className="text-xl font-bold">Push Notifications</h1>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="bg-black hover:bg-black/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Notification
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={Send}
                        label="Total Sent"
                        value={mockStats.totalSent}
                        trend={12.5}
                        delay={0}
                    />
                    <StatCard
                        icon={Activity}
                        label="Avg. Open Rate"
                        value={mockStats.avgOpenRate}
                        suffix="%"
                        trend={3.2}
                        delay={0.1}
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Avg. Click Rate"
                        value={mockStats.avgClickRate}
                        suffix="%"
                        trend={-1.4}
                        delay={0.2}
                    />
                    <StatCard
                        icon={Users}
                        label="Active Subscribers"
                        value={mockStats.activeSubscribers}
                        trend={8.7}
                        delay={0.3}
                    />
                </div>

                {/* Create Notification Form */}
                <AnimatePresence>
                    {showCreateForm && (
                        <div className="mb-8">
                            <SendNotificationCard onClose={() => setShowCreateForm(false)} />
                        </div>
                    )}
                </AnimatePresence>

                {/* Notifications List Section */}
                <div className="space-y-4">
                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search notifications..."
                                className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-all min-w-[160px] justify-between shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {filterOptions.find(o => o.value === statusFilter)?.label}
                                    </span>
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showFilterDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl overflow-hidden shadow-xl z-50"
                                    >
                                        {filterOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setStatusFilter(option.value)
                                                    setShowFilterDropdown(false)
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === option.value
                                                    ? 'bg-black/5 text-black font-medium'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-3">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification, index) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    index={index}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                                    <Bell className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2">No notifications found</h3>
                                <p className="text-gray-500">
                                    {searchQuery || statusFilter !== 'all'
                                        ? 'Try adjusting your search or filters'
                                        : 'Create your first push notification to get started'}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NotificationsPage
