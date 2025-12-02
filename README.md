# Trend Dashboard

一个精美的趋势看板，聚合展示多个平台的趋势数据：
- 🔍 Google Trends
- 𝕏 X (Twitter) Trending
- 🎵 中国抖音热榜
- 🎬 外国TikTok热榜
- 🔥 微博热搜

## ✨ 功能特性

- 🎨 精美的现代化UI设计，支持深色模式
- 📊 实时趋势数据展示
- 🔄 自动刷新功能（每5分钟）
- 📱 完全响应式设计，完美支持移动端
- ⚡ 快速加载和流畅动画效果
- 🎯 直观的趋势变化指示（上升/下降/持平）
- 🔗 点击趋势项可直接跳转到源平台

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React

## 🚀 快速开始

### 1. 安装依赖

```bash
cd "C:\Users\Trend Dashboard"
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

或者双击 `启动服务器.bat` 文件

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看结果。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 📝 API配置说明

### 当前状态

- ✅ **微博热搜** - 已集成，可直接使用（无需API密钥）
- ✅ **Google Trends** - 已集成RSS Feed，可直接使用
- 🔑 **X/Twitter** - 需要配置 `TWITTER_BEARER_TOKEN`
- 🔑 **抖音热榜** - 需要配置 `HOTLIST_API_KEY` 或 `DOUYIN_API_KEY`
- 🔑 **TikTok** - 需要配置 `TIKTOK_ACCESS_TOKEN`

### 配置真实API

1. 复制 `.env.example` 为 `.env.local`
2. 填入相应的API密钥
3. 重启开发服务器

详细说明请查看：
- `API集成指南.md` - 详细的API获取方法
- `快速集成真实数据.md` - 快速开始步骤

## 📁 项目结构

```
Trend Dashboard/
├── app/
│   ├── api/              # API路由
│   │   ├── google-trends/
│   │   ├── x-trending/
│   │   ├── douyin/
│   │   ├── tiktok/
│   │   └── weibo/
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页
├── components/
│   └── TrendCard.tsx    # 趋势卡片组件
├── public/              # 静态资源
└── ...配置文件
```

## 🎨 UI特性

- **渐变色彩**: 每个平台都有独特的品牌色彩
- **动画效果**: 使用Framer Motion实现流畅的进入动画
- **加载状态**: 优雅的骨架屏加载效果
- **交互反馈**: 悬停和点击时的视觉反馈
- **深色模式**: 自动适配系统主题

## 🔧 自定义配置

### 修改刷新间隔

在 `app/page.tsx` 中修改：

```typescript
const interval = setInterval(fetchTrendData, 300000) // 300000ms = 5分钟
```

### 修改平台配置

在 `app/page.tsx` 的 `platforms` 状态中修改平台信息。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## ⚠️ 注意事项

1. 部分平台的API可能需要付费或特殊权限
2. 请遵守各平台的使用条款和API限制
3. 建议在生产环境中添加错误处理和限流机制
4. 注意保护API密钥，不要提交到版本控制系统

## 📚 相关文档

- `API集成指南.md` - 详细的API集成说明
- `快速集成真实数据.md` - 快速开始指南
- `.env.example` - 环境变量配置模板

---


享受使用 Trend Dashboard！🎊

