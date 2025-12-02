import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 注意：抖音API需要特殊处理，可能需要使用爬虫或第三方API
    // 这里使用模拟数据
    const mockData = {
      items: [
        {
          id: '1',
          title: '热门舞蹈挑战',
          description: '最新流行的舞蹈挑战视频',
          rank: 1,
          change: 'up',
          url: 'https://www.douyin.com',
        },
        {
          id: '2',
          title: '美食分享',
          description: '美食制作和分享',
          rank: 2,
          change: 'up',
          url: 'https://www.douyin.com',
        },
        {
          id: '3',
          title: '搞笑段子',
          description: '热门搞笑内容',
          rank: 3,
          change: 'same',
          url: 'https://www.douyin.com',
        },
        {
          id: '4',
          title: '时尚穿搭',
          description: '最新时尚趋势',
          rank: 4,
          change: 'down',
          url: 'https://www.douyin.com',
        },
        {
          id: '5',
          title: '宠物日常',
          description: '可爱的宠物视频',
          rank: 5,
          change: 'up',
          url: 'https://www.douyin.com',
        },
      ],
    }

    // 方案1：使用第三方API服务（推荐）
    // HotList API 或其他第三方服务
    if (process.env.HOTLIST_API_KEY || process.env.DOUYIN_API_KEY) {
      try {
        // 示例：使用HotList API获取抖音热榜
        const apiKey = process.env.HOTLIST_API_KEY || process.env.DOUYIN_API_KEY
        const response = await fetch('https://api.example.com/douyin/hot', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          // 根据实际API返回格式处理数据
          if (data.data && Array.isArray(data.data)) {
            const items = data.data.slice(0, 10).map((item: any, index: number) => ({
              id: item.id || `douyin-${index}`,
              title: item.title || item.name || '未知',
              description: item.description || item.desc || '',
              rank: index + 1,
              change: item.hot_value > 1000000 ? 'up' : 'same',
              url: item.url || item.link || `https://www.douyin.com/search/${encodeURIComponent(item.title || '')}`,
            }))

            return NextResponse.json({ items })
          }
        }
      } catch (apiError) {
        console.warn('抖音API调用失败，使用备用方案:', apiError)
      }
    }

    // 方案2：使用开源项目rebang的数据
    // 参考：https://github.com/seiichieto07/rebang
    /*
    try {
      const response = await fetch('https://api.rebang.today/api/v1/douyin')
      const data = await response.json()
      // 处理数据...
    } catch (error) {
      console.warn('rebang API调用失败:', error)
    }
    */

    // 降级方案：返回模拟数据
    return NextResponse.json(mockData)
  } catch (error) {
    console.error('获取抖音热榜数据失败:', error)
    return NextResponse.json(
      { items: [], error: '获取数据失败' },
      { status: 500 }
    )
  }
}

