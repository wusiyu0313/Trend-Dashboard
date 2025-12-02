'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react'

interface TrendItem {
  id: string
  title: string
  description?: string
  rank: number
  change?: 'up' | 'down' | 'same'
  url?: string
}

interface TrendCardProps {
  platform: string
  icon: string
  color: string
  items: TrendItem[]
  loading: boolean
  delay?: number
}

export default function TrendCard({
  platform,
  icon,
  color,
  items,
  loading,
  delay = 0,
}: TrendCardProps) {
  const getChangeIcon = (change?: string) => {
    switch (change) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 hover:scale-[1.02]"
    >
      {/* 卡片头部 */}
      <div className={`${color} p-4 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl drop-shadow-lg">{icon}</span>
            <h2 className="text-xl font-bold drop-shadow-md">{platform}</h2>
          </div>
          {items.length > 0 && (
            <span className="text-sm opacity-90 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
              {items.length} 条趋势
            </span>
          )}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4 max-h-[600px] overflow-y-auto bg-gradient-to-b from-transparent to-gray-50/50 dark:to-slate-900/50">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex items-start gap-3"
              >
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>暂无数据</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <motion.a
                key={item.id}
                href={item.url || '#'}
                target={item.url ? '_blank' : undefined}
                rel={item.url ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group cursor-pointer"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {item.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.url && (
                      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.change && (
                    <div className="flex items-center gap-1 mt-2">
                      {getChangeIcon(item.change)}
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

