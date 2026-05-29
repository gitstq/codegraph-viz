<div align="center">

<img src="./public/logo.svg" width="120" height="120" alt="CodeGraph-Viz Logo">

# 🕸️ CodeGraph-Viz

**輕量級代碼知識圖譜可視化工具**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)

[简体中文](./README.md) | [繁體中文](./README.zh-TW.md) | [English](./README.en.md)

</div>

---

## 🎉 專案介紹

**CodeGraph-Viz** 是一款**零依賴、即開即用、隱私優先**的代碼知識圖譜可視化工具。

剛加入新團隊？面對幾十萬行代碼不知從何入手？CodeGraph-Viz 幫你一鍵生成代碼知識圖譜，讓代碼結構一目瞭然！

### 💡 靈感來源

本專案靈感來源於 GitHub Trending 上的 [Understand-Anything](https://github.com/Lum1104/Understand-Anything)（43k+ stars），但我們採用了完全不同的定位：

- **更輕量** - 無需安裝 IDE 外掛，純 Web 應用
- **更易用** - 拖拽上傳代碼文件夾即可生成圖譜
- **更隱私** - 純前端處理，代碼不上傳伺服器
- **更專注** - 單倉庫實現，無複雜多代理管道

### ✨ 核心差異化亮點

1. 🚀 **零配置啟動** - 無需安裝任何依賴，打開瀏覽器即可使用
2. 🔒 **隱私優先** - 所有分析在瀏覽器本地完成，代碼絕不外洩
3. 📦 **多語言支持** - 支持 TypeScript、JavaScript、Python、Java、Go、Rust 等主流語言
4. 🎯 **實時可視化** - 基於 React Flow 的交互式知識圖譜
5. 💾 **一鍵導出** - 支持導出圖譜為 JSON 格式

---

## ✨ 核心特性

### 🗂️ 智能代碼分析
- **多語言識別** - 自動識別 TypeScript、JavaScript、Python、Java、Go、Rust、C++、Ruby、PHP 等語言
- **符號提取** - 自動提取函數、類、介面等代碼符號
- **關係映射** - 智能分析文件導入關係、函數調用關係

### 📊 交互式可視化
- **圖譜展示** - 文件、函數、類以節點形式展示，關係以邊連接
- **層級結構** - 自動按文件組織符號，形成清晰的層級結構
- **動態過濾** - 可自由開關文件節點、函數節點、類節點的顯示
- **點擊查看** - 點擊節點查看詳細資訊

### 🎨 精美介面
- **深色主題** - 專為開發者設計的深色介面
- **毛玻璃效果** - 現代化的 UI 設計風格
- **流暢動畫** - 優雅的過渡動畫效果
- **響應式佈局** - 適配不同螢幕尺寸

---

## 🚀 快速開始

### 環境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 或 **pnpm** >= 8.0.0

### 安裝步驟

```bash
# 克隆倉庫
git clone https://github.com/gitstq/codegraph-viz.git

# 進入專案目錄
cd codegraph-viz

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 一鍵運行

```bash
# 使用 npx 直接運行（無需克隆）
npx degit gitstq/codegraph-viz codegraph-viz
cd codegraph-viz
npm install
npm run dev
```

應用將在 `http://localhost:3000` 啟動。

---

## 📖 詳細使用指南

### 1️⃣ 上傳代碼

- **拖拽上傳** - 直接將代碼文件或文件夾拖拽到頁面中
- **點擊選擇** - 點擊"選擇文件"或"選擇文件夾"按鈕

### 2️⃣ 查看圖譜

上傳完成後，系統會自動分析代碼並生成知識圖譜：

- 🔵 **藍色節點** - 文件節點
- 🟢 **綠色節點** - 函數節點
- 🟣 **紫色節點** - 類節點
- ⬆️ **黃色箭頭** - 導入關係
- ➡️ **灰色箭頭** - 包含關係

### 3️⃣ 交互操作

| 操作 | 說明 |
|------|------|
| 拖拽 | 拖動節點調整位置 |
| 滾輪 | 縮放圖譜 |
| 點擊 | 查看節點詳情 |
| 框選 | 多選節點 |

### 4️⃣ 視圖控制

在左側邊欄可以：
- 開關不同類型的節點顯示
- 查看圖譜統計資訊
- 監控分析進度

### 5️⃣ 導出圖譜

點擊右上角的"導出圖譜"按鈕，可將當前圖譜導出為 JSON 文件。

---

## 💡 設計思路與迭代規劃

### 技術選型原因

| 技術 | 選型原因 |
|------|----------|
| **React 18** | 成熟的組件化框架，生態豐富 |
| **TypeScript** | 類型安全，提升代碼質量 |
| **Vite** | 快速的開發體驗，優化的構建輸出 |
| **React Flow** | 專業的節點圖譜可視化庫 |
| **Zustand** | 輕量級狀態管理，簡單易用 |
| **Tailwind CSS** | 原子化 CSS，快速構建介面 |

### 架構設計

```
codegraph-viz/
├── src/
│   ├── components/     # React 組件
│   │   ├── Header.tsx      # 頂部導航
│   │   ├── Sidebar.tsx     # 側邊欄
│   │   ├── FileUploader.tsx # 文件上傳
│   │   ├── GraphCanvas.tsx  # 圖譜畫布
│   │   └── NodeDetails.tsx  # 節點詳情
│   ├── store/          # 狀態管理
│   │   └── graphStore.ts   # 圖譜狀態
│   ├── utils/          # 工具函數
│   │   └── codeAnalyzer.ts # 代碼分析器
│   ├── types/          # TypeScript 類型
│   │   └── index.ts        # 類型定義
│   ├── App.tsx         # 主應用組件
│   ├── main.tsx        # 入口文件
│   └── index.css       # 全局樣式
├── public/             # 靜態資源
└── package.json        # 專案配置
```

### 後續迭代計劃

- [ ] 支持更多編程語言（C#、Swift、Kotlin 等）
- [ ] 添加代碼複雜度分析
- [ ] 支持循環依賴檢測
- [ ] 添加圖譜佈局算法選項
- [ ] 支持導出為 PNG/SVG 圖片
- [ ] 添加代碼搜索功能
- [ ] 支持 Git 歷史分析

---

## 📦 打包與部署

### 構建生產版本

```bash
# 構建專案
npm run build

# 預覽生產版本
npm run preview
```

構建輸出位於 `dist/` 目錄。

### 部署到 GitHub Pages

```bash
# 安裝 gh-pages
npm install -D gh-pages

# 添加部署腳本到 package.json
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
# 構建並運行 Docker 鏡像
docker build -t codegraph-viz .
docker run -p 8080:80 codegraph-viz
```

---

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！

### 提交 Issue

- 使用清晰的標題描述問題
- 提供復現步驟和環境資訊
- 附上相關截圖或日誌

### 提交 Pull Request

1. Fork 本倉庫
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: 添加某個功能'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 創建 Pull Request

### 代碼規範

- 使用 TypeScript 編寫代碼
- 遵循 ESLint 配置
- 提交資訊遵循 [Conventional Commits](https://conventionalcommits.org/) 規範

---

## 📄 開源協議

本專案採用 [MIT](LICENSE) 協議開源。

---

<div align="center">

**Made with ❤️ by CodeGraph Team**

如果這個專案對你有幫助，請給我們一個 ⭐️ Star！

</div>
