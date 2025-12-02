import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 注意：X (Twitter) API需要认证
    // 这里使用模拟数据，实际使用时需要配置Twitter API密钥
    const mockData = {
      items: [
        {
          id: '1',
          title: '#TechNews',
          description: '最新科技新闻讨论',
          rank: 1,
          change: 'up',
          url: 'https://twitter.com',
        },
        {
          id: '2',
          title: '#BreakingNews',
          description: '突发新闻',
          rank: 2,
          change: 'up',
          url: 'https://twitter.com',
        },
        {
          id: '3',
          title: '#Sports',
          description: '体育赛事热点',
          rank: 3,
          change: 'same',
          url: 'https://twitter.com',
        },
        {
          id: '4',
          title: '#Entertainment',
          description: '娱乐新闻',
          rank: 4,
          change: 'down',
          url: 'https://twitter.com',
        },
        {
          id: '5',
          title: '#Politics',
          description: '政治话题',
          rank: 5,
          change: 'up',
          url: 'https://twitter.com',
        },
      ],
    }

    // 方案1：使用 Twitter API v2 获取趋势（需要API密钥）
    if (process.env.TWITTER_BEARER_TOKEN) {
      try {
        // 获取全球趋势（WOEID: 1 = 全球）
        const response = await fetch('https://api.twitter.com/1.1/trends/place.json?id=1', {
          headers: {
            'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          
          if (data[0] && data[0].trends) {
            const items = data[0].trends.slice(0, 10).map((trend: any, index: number) => ({
              id: trend.name || `twitter-${index}`,
              title: trend.name || '未知话题',
              description: trend.query || '',
              rank: index + 1,
              change: trend.tweet_volume ? 'up' : 'same',
              url: trend.url || `https://twitter.com/search?q=${encodeURIComponent(trend.name || '')}`,
            }))

            return NextResponse.json({ items })
          }
        }
      } catch (apiError) {
        console.warn('Twitter API调用失败，使用备用方案:', apiError)
      }
    }

    // 方案2：使用 Twitter API v2 搜索端点
    /*
    if (process.env.TWITTER_BEARER_TOKEN) {
      const response = await fetch('https://api.twitter.com/2/tweets/search/recent?query=trending&max_results=10', {
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
      })
      const data = await response.json()
      // 处理返回的数据...
    }
    */

    // 降级方案：返回模拟数据
    return NextResponse.json(mockData)
  } catch (error) {
    console.error('获取X Trending数据失败:', error)
    return NextResponse.json(
      { items: [], error: '获取数据失败' },
      { status: 500 }
    )
  }
}

