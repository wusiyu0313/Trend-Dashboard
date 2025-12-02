import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 方案1：使用微博公开接口（推荐，免费且无需API密钥）
    try {
      const response = await fetch('https://weibo.com/ajax/side/hotSearch', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://weibo.com/',
        },
      })

      if (response.ok) {
        const data = await response.json()
        
        // 处理微博热搜数据格式
        if (data.data && data.data.realtime) {
          const items = data.data.realtime.slice(0, 10).map((item: any, index: number) => ({
            id: item.mid || `weibo-${index}`,
            title: item.word || item.word_scheme || '未知话题',
            description: item.word_scheme || item.category || '',
            rank: index + 1,
            change: item.is_new ? 'up' : 'same',
            url: item.url || `https://s.weibo.com/weibo?q=${encodeURIComponent(item.word || '')}`,
          }))

          return NextResponse.json({ items })
        }
      }
    } catch (apiError) {
      console.warn('微博公开接口调用失败，使用备用方案:', apiError)
    }

    // 方案2：使用官方API（需要API密钥）
    // 取消下面的注释并配置环境变量 WEIBO_ACCESS_TOKEN
    /*
    if (process.env.WEIBO_ACCESS_TOKEN) {
      const response = await fetch('https://api.weibo.com/2/trends/hourly.json', {
        headers: {
          'Authorization': `Bearer ${process.env.WEIBO_ACCESS_TOKEN}`
        }
      })
      const data = await response.json()
      // 处理返回的数据...
    }
    */

    // 降级方案：返回模拟数据
    const mockData = {
      items: [
        {
          id: '1',
          title: '热门话题讨论',
          description: '当前最热门的话题',
          rank: 1,
          change: 'up',
          url: 'https://weibo.com',
        },
        {
          id: '2',
          title: '明星动态',
          description: '娱乐圈最新动态',
          rank: 2,
          change: 'up',
          url: 'https://weibo.com',
        },
        {
          id: '3',
          title: '社会新闻',
          description: '社会热点新闻',
          rank: 3,
          change: 'same',
          url: 'https://weibo.com',
        },
        {
          id: '4',
          title: '科技资讯',
          description: '科技行业新闻',
          rank: 4,
          change: 'down',
          url: 'https://weibo.com',
        },
        {
          id: '5',
          title: '体育赛事',
          description: '体育比赛热点',
          rank: 5,
          change: 'up',
          url: 'https://weibo.com',
        },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('获取微博热搜数据失败:', error)
    return NextResponse.json(
      { items: [], error: '获取数据失败' },
      { status: 500 }
    )
  }
}

