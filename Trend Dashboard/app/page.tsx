'use client'

import { useState, useEffect } from 'react'
import TrendCard from '@/components/TrendCard'
import { RefreshCw } from 'lucide-react'

interface TrendItem {
  id: string
  title: string
  description?: string
  rank: number
  change?: 'up' | 'down' | 'same'
  url?: string
}

interface PlatformData {
  platform: string
  icon: string
  color: string
  items: TrendItem[]
  loading: boolean
}

export default function Home() {
  const [platforms, setPlatforms] = useState<PlatformData[]>([
    {
      platform: 'Google Trends',
      icon: '🔍',
      color: 'bg-blue-500',
      items: [],
      loading: true,
    },
    {
      platform: 'X Trending',
      icon: '𝕏',
      color: 'bg-black',
      items: [],
      loading: true,
    },
    {
      platform: '抖音热榜',
      icon: '🎵',
      color: 'bg-pink-500',
      items: [],
      loading: true,
    },
    {
      platform: 'TikTok热榜',
      icon: '🎬',
      color: 'bg-cyan-500',
      items: [],
      loading: true,
    },
    {
      platform: '微博热搜',
      icon: '🔥',
      color: 'bg-red-500',
      items: [],
      loading: true,
    },
  ])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchTrendData = async () => {
    setIsRefreshing(true)
    try {
      const responses = await Promise.all([
        fetch('/api/google-trends'),
        fetch('/api/x-trending'),
        fetch('/api/douyin'),
        fetch('/api/tiktok'),
        fetch('/api/weibo'),
      ])

      const data = await Promise.all(
        responses.map((res) => res.json())
      )

      setPlatforms((prev) =>
        prev.map((platform, index) => ({
          ...platform,
          items: data[index].items || [],
          loading: false,
        }))
      )
    } catch (error) {
      console.error('获取趋势数据失败:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchTrendData()
    const interval = setInterval(fetchTrendData, 300000) // 每5分钟刷新一次
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trend Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              实时追踪全球热门趋势
            </p>
          </div>
          <button
            onClick={fetchTrendData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            <span className="hidden md:inline">刷新</span>
          </button>
        </div>

        {/* 趋势卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <TrendCard
              key={platform.platform}
              platform={platform.platform}
              icon={platform.icon}
              color={platform.color}
              items={platform.items}
              loading={platform.loading}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

