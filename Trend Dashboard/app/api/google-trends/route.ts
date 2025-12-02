import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 方案1：使用 Google Trends RSS Feed（免费，无需API密钥）
    // 注意：需要处理CORS问题，可能需要使用代理或后端服务
    try {
      // 获取美国地区的热门搜索（可以修改geo参数获取其他地区）
      // geo参数：US=美国, CN=中国, JP=日本, GB=英国 等
      const geo = 'US' // 可以根据需要修改
      const response = await fetch(
        `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        }
      )

      if (response.ok) {
        const xmlText = await response.text()
        
        // 解析RSS XML（简化版，实际应该使用XML解析库）
        const items: any[] = []
        const titleMatches = xmlText.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g)
        const linkMatches = xmlText.matchAll(/<link>(.*?)<\/link>/g)
        
        const titles = Array.from(titleMatches).map(m => m[1]).filter(t => t !== 'Daily Search Trends')
        const links = Array.from(linkMatches).map(m => m[1])
        
        titles.slice(0, 10).forEach((title, index) => {
          items.push({
            id: `google-${index}`,
            title: title,
            description: `Google Trends - ${geo}`,
            rank: index + 1,
            change: 'up',
            url: links[index] || `https://trends.google.com/trends/explore?q=${encodeURIComponent(title)}`,
          })
        })

        if (items.length > 0) {
          return NextResponse.json({ items })
        }
      }
    } catch (apiError) {
      console.warn('Google Trends RSS调用失败，使用备用方案:', apiError)
    }

    // 方案2：使用第三方API服务（需要API密钥）
    // 例如：RapidAPI上的Google Trends API
    /*
    if (process.env.GOOGLE_TRENDS_API_KEY) {
      const response = await fetch('YOUR_GOOGLE_TRENDS_API_URL', {
        headers: {
          'X-RapidAPI-Key': process.env.GOOGLE_TRENDS_API_KEY,
          'X-RapidAPI-Host': 'google-trends-api.p.rapidapi.com'
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
          title: 'AI人工智能',
          description: '人工智能技术的最新发展',
          rank: 1,
          change: 'up',
          url: 'https://trends.google.com',
        },
        {
          id: '2',
          title: '气候变化',
          description: '全球气候变化的讨论',
          rank: 2,
          change: 'up',
          url: 'https://trends.google.com',
        },
        {
          id: '3',
          title: '加密货币',
          description: '数字货币市场动态',
          rank: 3,
          change: 'down',
          url: 'https://trends.google.com',
        },
        {
          id: '4',
          title: '电动汽车',
          description: '新能源汽车趋势',
          rank: 4,
          change: 'same',
          url: 'https://trends.google.com',
        },
        {
          id: '5',
          title: '太空探索',
          description: '航天科技进展',
          rank: 5,
          change: 'up',
          url: 'https://trends.google.com',
        },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('获取Google Trends数据失败:', error)
    return NextResponse.json(
      { items: [], error: '获取数据失败' },
      { status: 500 }
    )
  }
}

