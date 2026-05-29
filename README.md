<div align="center">

<img src="./public/logo.svg" width="120" height="120" alt="CodeGraph-Viz Logo">

# 🕸️ CodeGraph-Viz

**轻量级代码知识图谱可视化工具**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)

[简体中文](./README.md) | [繁體中文](./README.zh-TW.md) | [English](./README.en.md)

</div>

---

## 🎉 项目介绍

**CodeGraph-Viz** 是一款**零依赖、即开即用、隐私优先**的代码知识图谱可视化工具。

刚加入新团队？面对几十万行代码不知从何入手？CodeGraph-Viz 帮你一键生成代码知识图谱，让代码结构一目了然！

### 💡 灵感来源

本项目灵感来源于 GitHub Trending 上的 [Understand-Anything](https://github.com/Lum1104/Understand-Anything)（43k+ stars），但我们采用了完全不同的定位：

- **更轻量** - 无需安装 IDE 插件，纯 Web 应用
- **更易用** - 拖拽上传代码文件夹即可生成图谱
- **更隐私** - 纯前端处理，代码不上传服务器
- **更专注** - 单仓库实现，无复杂多代理管道

### ✨ 核心差异化亮点

1. 🚀 **零配置启动** - 无需安装任何依赖，打开浏览器即可使用
2. 🔒 **隐私优先** - 所有分析在浏览器本地完成，代码绝不外泄
3. 📦 **多语言支持** - 支持 TypeScript、JavaScript、Python、Java、Go、Rust 等主流语言
4. 🎯 **实时可视化** - 基于 React Flow 的交互式知识图谱
5. 💾 **一键导出** - 支持导出图谱为 JSON 格式

---

## ✨ 核心特性

### 🗂️ 智能代码分析
- **多语言识别** - 自动识别 TypeScript、JavaScript、Python、Java、Go、Rust、C++、Ruby、PHP 等语言
- **符号提取** - 自动提取函数、类、接口等代码符号
- **关系映射** - 智能分析文件导入关系、函数调用关系

### 📊 交互式可视化
- **图谱展示** - 文件、函数、类以节点形式展示，关系以边连接
- **层级结构** - 自动按文件组织符号，形成清晰的层级结构
- **动态过滤** - 可自由开关文件节点、函数节点、类节点的显示
- **点击查看** - 点击节点查看详细信息

### 🎨 精美界面
- **深色主题** - 专为开发者设计的深色界面
- **毛玻璃效果** - 现代化的 UI 设计风格
- **流畅动画** - 优雅的过渡动画效果
- **响应式布局** - 适配不同屏幕尺寸

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 或 **pnpm** >= 8.0.0

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/gitstq/codegraph-viz.git

# 进入项目目录
cd codegraph-viz

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 一键运行

```bash
# 使用 npx 直接运行（无需克隆）
npx degit gitstq/codegraph-viz codegraph-viz
cd codegraph-viz
npm install
npm run dev
```

应用将在 `http://localhost:3000` 启动。

---

## 📖 详细使用指南

### 1️⃣ 上传代码

- **拖拽上传** - 直接将代码文件或文件夹拖拽到页面中
- **点击选择** - 点击"选择文件"或"选择文件夹"按钮

### 2️⃣ 查看图谱

上传完成后，系统会自动分析代码并生成知识图谱：

- 🔵 **蓝色节点** - 文件节点
- 🟢 **绿色节点** - 函数节点
- 🟣 **紫色节点** - 类节点
- ⬆️ **黄色箭头** - 导入关系
- ➡️ **灰色箭头** - 包含关系

### 3️⃣ 交互操作

| 操作 | 说明 |
|------|------|
| 拖拽 | 拖动节点调整位置 |
| 滚轮 | 缩放图谱 |
| 点击 | 查看节点详情 |
| 框选 | 多选节点 |

### 4️⃣ 视图控制

在左侧边栏可以：
- 开关不同类型的节点显示
- 查看图谱统计信息
- 监控分析进度

### 5️⃣ 导出图谱

点击右上角的"导出图谱"按钮，可将当前图谱导出为 JSON 文件。

---

## 💡 设计思路与迭代规划

### 技术选型原因

| 技术 | 选型原因 |
|------|----------|
| **React 18** | 成熟的组件化框架，生态丰富 |
| **TypeScript** | 类型安全，提升代码质量 |
| **Vite** | 快速的开发体验，优化的构建输出 |
| **React Flow** | 专业的节点图谱可视化库 |
| **Zustand** | 轻量级状态管理，简单易用 |
| **Tailwind CSS** | 原子化 CSS，快速构建界面 |

### 架构设计

```
codegraph-viz/
├── src/
│   ├── components/     # React 组件
│   │   ├── Header.tsx      # 顶部导航
│   │   ├── Sidebar.tsx     # 侧边栏
│   │   ├── FileUploader.tsx # 文件上传
│   │   ├── GraphCanvas.tsx  # 图谱画布
│   │   └── NodeDetails.tsx  # 节点详情
│   ├── store/          # 状态管理
│   │   └── graphStore.ts   # 图谱状态
│   ├── utils/          # 工具函数
│   │   └── codeAnalyzer.ts # 代码分析器
│   ├── types/          # TypeScript 类型
│   │   └── index.ts        # 类型定义
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 入口文件
│   └── index.css       # 全局样式
├── public/             # 静态资源
└── package.json        # 项目配置
```

### 后续迭代计划

- [ ] 支持更多编程语言（C#、Swift、Kotlin 等）
- [ ] 添加代码复杂度分析
- [ ] 支持循环依赖检测
- [ ] 添加图谱布局算法选项
- [ ] 支持导出为 PNG/SVG 图片
- [ ] 添加代码搜索功能
- [ ] 支持 Git 历史分析

---

## 📦 打包与部署

### 构建生产版本

```bash
# 构建项目
npm run build

# 预览生产版本
npm run preview
```

构建输出位于 `dist/` 目录。

### 部署到 GitHub Pages

```bash
# 安装 gh-pages
npm install -D gh-pages

# 添加部署脚本到 package.json
# "deploy": "gh-pages -d dist"

# 部署
npm run deploy
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
# 构建并运行 Docker 镜像
docker build -t codegraph-viz .
docker run -p 8080:80 codegraph-viz
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 提交 Issue

- 使用清晰的标题描述问题
- 提供复现步骤和环境信息
- 附上相关截图或日志

### 提交 Pull Request

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: 添加某个功能'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 配置
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/) 规范

---

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

---

<div align="center">

**Made with ❤️ by CodeGraph Team**

如果这个项目对你有帮助，请给我们一个 ⭐️ Star！

</div>
