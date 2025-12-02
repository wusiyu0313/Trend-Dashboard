# API集成指南 - 获取真实趋势数据

## 📋 概述

本指南将帮助您集成各平台的真实API，获取实时趋势数据。不同平台有不同的获取方式，有些需要API密钥，有些可以使用免费方案。

---

## 🔍 1. Google Trends

### 方案A：使用 Google Trends RSS Feed（免费，无需API密钥）

Google Trends 提供 RSS Feed，可以直接获取热门搜索：

```typescript
// 示例：获取特定地区的热门搜索
const response = await fetch('https://trends.google.com/trends/trendingsearches/daily/rss?geo=US')
```

### 方案B：使用第三方服务

- **Scrapeless API**：提供 Google Trends 数据抓取服务
- **RapidAPI**：有多个 Google Trends API 提供商

### 方案C：使用 pytrends（需要后端服务）

如果使用 Node.js，可以通过 Python 服务桥接，或使用 Node.js 版本的实现。

---

## 🐦 2. X (Twitter) Trending

### 官方 Twitter API v2（需要API密钥）

1. **申请步骤**：
   - 访问 https://developer.twitter.com/
   - 注册开发者账号
   - 创建应用获取 Bearer Token

2. **API端点**：
   ```typescript
   // 获取趋势话题
   GET https://api.twitter.com/1.1/trends/place.json?id=1
   ```

### 免费替代方案

- 使用 Twitter 的公开 RSS Feed（如果可用）
- 使用第三方聚合服务

---

## 🎵 3. 抖音热榜

### 方案A：使用第三方API服务

**HotList API** (https://www.jzl.com/)：
- 提供抖音热榜接口
- 数据更新周期短
- 需要注册获取API密钥

### 方案B：爬虫方案（需遵守使用条款）

⚠️ **注意**：使用爬虫需要遵守抖音的使用条款，建议使用官方或授权的第三方API。

### 方案C：使用开源项目

参考开源项目如 `rebang`，它聚合了多个平台的热搜数据。

---

## 🎬 4. TikTok热榜

### 官方 TikTok Research API（需要申请）

1. **申请步骤**：
   - 访问 https://developers.tiktok.com/
   - 申请 Research API 访问权限
   - 获取 Access Token

2. **API端点**：
   ```typescript
   POST https://open.tiktokapis.com/v2/research/trending/query/
   ```

### 免费替代方案

- 使用第三方数据聚合服务
- 通过 RSS Feed（如果可用）

---

## 🔥 5. 微博热搜

### 方案A：使用微博公开接口（免费）

微博提供了公开的热搜接口，无需API密钥：

```typescript
// 获取实时热搜
const response = await fetch('https://weibo.com/ajax/side/hotSearch')
```

### 方案B：使用官方API（需要认证）

如果需要更多数据，可以申请微博开放平台API：
- 访问 https://open.weibo.com/
- 创建应用获取 App Key 和 App Secret

---

## 🚀 快速开始

### 步骤1：配置环境变量

创建 `.env.local` 文件（已提供 `.env.example` 作为模板）：

```env
# Twitter/X API
TWITTER_BEARER_TOKEN=your_bearer_token_here

# TikTok API
TIKTOK_ACCESS_TOKEN=your_access_token_here

# 微博API（可选）
WEIBO_ACCESS_TOKEN=your_access_token_here

# 其他第三方服务
HOTLIST_API_KEY=your_api_key_here
```

### 步骤2：更新API路由

我已经为您更新了API路由文件，包含真实API调用的示例代码。您只需要：

1. 取消注释真实API调用的代码
2. 填入相应的API密钥
3. 根据返回的数据格式调整数据处理逻辑

### 步骤3：测试API

启动开发服务器后，访问：
- http://localhost:3000/api/google-trends
- http://localhost:3000/api/x-trending
- http://localhost:3000/api/weibo
- 等等...

查看返回的数据格式，确保与前端组件兼容。

---

## 📝 推荐方案（按优先级）

### 最容易实现（免费）

1. **微博热搜**：使用公开接口，无需API密钥 ✅
2. **Google Trends**：使用RSS Feed ✅
3. **抖音热榜**：使用第三方免费API（如HotList）

### 需要API密钥

1. **Twitter/X**：申请官方API（免费层有限制）
2. **TikTok**：申请Research API（需要审核）

---

## ⚠️ 重要注意事项

1. **API限制**：注意各平台的调用频率限制
2. **数据合规**：遵守各平台的使用条款
3. **错误处理**：实现完善的错误处理和降级方案
4. **缓存策略**：合理使用缓存，避免频繁调用
5. **成本控制**：注意付费API的使用成本

---

## 🔧 代码示例

查看 `app/api/` 目录下的各个路由文件，我已经添加了真实API调用的示例代码和注释说明。

---

## 📚 参考资源

- [Google Trends RSS](https://trends.google.com/trends/trendingsearches/daily)
- [Twitter API 文档](https://developer.twitter.com/en/docs)
- [TikTok Research API](https://developers.tiktok.com/doc/research-api/)
- [微博开放平台](https://open.weibo.com/)
- [HotList API](https://www.jzl.com/)

---

## 💡 提示

- 建议先从**微博热搜**开始，因为它最简单且免费
- 逐步集成其他平台，每次测试一个
- 使用环境变量管理API密钥，不要提交到Git
- 实现错误处理和降级方案，API失败时显示友好提示

