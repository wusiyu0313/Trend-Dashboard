import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 注意：TikTok API需要认证
    // 这里使用模拟数据，实际使用时需要配置TikTok API密钥
    const mockData = {
      items: [
        {
          id: '1',
          title: 'Viral Dance Challenge',
          description: 'Latest trending dance challenge',
          rank: 1,
          change: 'up',
          url: 'https://www.tiktok.com',
        },
        {
          id: '2',
          title: 'Cooking Tips',
          description: 'Popular cooking content',
          rank: 2,
          change: 'up',
          url: 'https://www.tiktok.com',
        },
        {
          id: '3',
          title: 'Comedy Skits',
          description: 'Funny comedy videos',
          rank: 3,
          change: 'same',
          url: 'https://www.tiktok.com',
        },
        {
          id: '4',
          title: 'Fashion Trends',
          description: 'Latest fashion trends',
          rank: 4,
          change: 'down',
          url: 'https://www.tiktok.com',
        },
        {
          id: '5',
          title: 'Pet Videos',
          description: 'Cute pet content',
          rank: 5,
          change: 'up',
          url: 'https://www.tiktok.com',
        },
      ],
    }

    // 方案1：使用 TikTok Research API（需要申请权限）
    if (process.env.TIKTOK_ACCESS_TOKEN) {
      try {
        const response = await fetch('https://open.tiktokapis.com/v2/research/trending/query/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.TIKTOK_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: 'trending',
            max_count: 10,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          
          if (data.data && data.data.list) {
            const items = data.data.list.slice(0, 10).map((item: any, index: number) => ({
              id: item.id || `tiktok-${index}`,
              title: item.title || item.keyword || 'Unknown',
              description: item.description || '',
              rank: index + 1,
              change: item.view_count > 1000000 ? 'up' : 'same',
              url: item.share_url || `https://www.tiktok.com/tag/${encodeURIComponent(item.title || '')}`,
            }))

            return NextResponse.json({ items })
          }
        }
      } catch (apiError) {
        console.warn('TikTok API调用失败，使用备用方案:', apiError)
      }
    }

    // 方案2：使用第三方API服务
    /*
    if (process.env.TIKTOK_API_KEY) {
      const response = await fetch('https://api.example.com/tiktok/trending', {
        headers: {
          'X-API-Key': process.env.TIKTOK_API_KEY
        }
      })
      const data = await response.json()
      // 处理数据...
    }
    */

    // 降级方案：返回模拟数据
    return NextResponse.json(mockData)
  } catch (error) {
    console.error('获取TikTok热榜数据失败:', error)
    return NextResponse.json(
      { items: [], error: '获取数据失败' },
      { status: 500 }
    )
  }
}

