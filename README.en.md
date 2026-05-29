<div align="center">

<img src="./public/logo.svg" width="120" height="120" alt="CodeGraph-Viz Logo">

# 🕸️ CodeGraph-Viz

**Lightweight Code Knowledge Graph Visualization Tool**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)

[简体中文](./README.md) | [繁體中文](./README.zh-TW.md) | [English](./README.en.md)

</div>

---

## 🎉 Project Introduction

**CodeGraph-Viz** is a **zero-dependency, ready-to-use, privacy-first** code knowledge graph visualization tool.

Just joined a new team? Facing hundreds of thousands of lines of code and don't know where to start? CodeGraph-Viz helps you generate code knowledge graphs with one click, making code structure clear at a glance!

### 💡 Inspiration

This project is inspired by [Understand-Anything](https://github.com/Lum1104/Understand-Anything) (43k+ stars) on GitHub Trending, but we take a completely different approach:

- **Lighter** - No IDE plugin installation required, pure web application
- **Easier** - Drag and drop code folders to generate graphs
- **More Private** - Pure frontend processing, code never leaves your browser
- **More Focused** - Single repository implementation, no complex multi-agent pipelines

### ✨ Key Differentiation Highlights

1. 🚀 **Zero Configuration** - No dependencies to install, open browser and use
2. 🔒 **Privacy First** - All analysis done locally in browser, code never leaked
3. 📦 **Multi-language Support** - TypeScript, JavaScript, Python, Java, Go, Rust, and more
4. 🎯 **Real-time Visualization** - Interactive knowledge graph based on React Flow
5. 💾 **One-click Export** - Export graphs as JSON format

---

## ✨ Core Features

### 🗂️ Intelligent Code Analysis
- **Multi-language Recognition** - Auto-detect TypeScript, JavaScript, Python, Java, Go, Rust, C++, Ruby, PHP
- **Symbol Extraction** - Automatically extract functions, classes, interfaces
- **Relationship Mapping** - Smart analysis of file imports and function calls

### 📊 Interactive Visualization
- **Graph Display** - Files, functions, classes as nodes, relationships as edges
- **Hierarchical Structure** - Auto-organize symbols by file, forming clear hierarchy
- **Dynamic Filtering** - Toggle file nodes, function nodes, class nodes freely
- **Click to View** - Click nodes to view detailed information

### 🎨 Beautiful Interface
- **Dark Theme** - Dark interface designed for developers
- **Glassmorphism** - Modern UI design style
- **Smooth Animations** - Elegant transition animations
- **Responsive Layout** - Adapt to different screen sizes

---

## 🚀 Quick Start

### Requirements

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **pnpm** >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/gitstq/codegraph-viz.git

# Enter project directory
cd codegraph-viz

# Install dependencies
npm install

# Start development server
npm run dev
```

### One-click Run

```bash
# Use npx to run directly (no cloning needed)
npx degit gitstq/codegraph-viz codegraph-viz
cd codegraph-viz
npm install
npm run dev
```

The app will start at `http://localhost:3000`.

---

## 📖 Detailed Usage Guide

### 1️⃣ Upload Code

- **Drag & Drop** - Directly drag code files or folders to the page
- **Click to Select** - Click "Select Files" or "Select Folder" button

### 2️⃣ View Graph

After upload, the system will automatically analyze code and generate knowledge graph:

- 🔵 **Blue Nodes** - File nodes
- 🟢 **Green Nodes** - Function nodes
- 🟣 **Purple Nodes** - Class nodes
- ⬆️ **Yellow Arrows** - Import relationships
- ➡️ **Gray Arrows** - Containment relationships

### 3️⃣ Interactive Operations

| Operation | Description |
|-----------|-------------|
| Drag | Drag nodes to adjust position |
| Scroll | Zoom graph |
| Click | View node details |
| Box Select | Multi-select nodes |

### 4️⃣ View Controls

In the left sidebar you can:
- Toggle display of different node types
- View graph statistics
- Monitor analysis progress

### 5️⃣ Export Graph

Click the "Export Graph" button in the top right to export current graph as JSON file.

---

## 💡 Design Philosophy & Roadmap

### Technology Choices

| Technology | Reason |
|------------|--------|
| **React 18** | Mature component framework, rich ecosystem |
| **TypeScript** | Type safety, improved code quality |
| **Vite** | Fast development experience, optimized build output |
| **React Flow** | Professional node graph visualization library |
| **Zustand** | Lightweight state management, simple and easy |
| **Tailwind CSS** | Atomic CSS, rapid interface building |

### Architecture

```
codegraph-viz/
├── src/
│   ├── components/     # React components
│   │   ├── Header.tsx      # Top navigation
│   │   ├── Sidebar.tsx     # Sidebar
│   │   ├── FileUploader.tsx # File upload
│   │   ├── GraphCanvas.tsx  # Graph canvas
│   │   └── NodeDetails.tsx  # Node details
│   ├── store/          # State management
│   │   └── graphStore.ts   # Graph state
│   ├── utils/          # Utilities
│   │   └── codeAnalyzer.ts # Code analyzer
│   ├── types/          # TypeScript types
│   │   └── index.ts        # Type definitions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry file
│   └── index.css       # Global styles
├── public/             # Static assets
└── package.json        # Project config
```

### Future Roadmap

- [ ] Support more programming languages (C#, Swift, Kotlin, etc.)
- [ ] Add code complexity analysis
- [ ] Support circular dependency detection
- [ ] Add graph layout algorithm options
- [ ] Support export to PNG/SVG images
- [ ] Add code search functionality
- [ ] Support Git history analysis

---

## 📦 Build & Deploy

### Build Production Version

```bash
# Build project
npm run build

# Preview production version
npm run preview
```

Build output is in `dist/` directory.

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Docker Deploy

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
# Build and run Docker image
docker build -t codegraph-viz .
docker run -p 8080:80 codegraph-viz
```

---

## 🤝 Contributing

We welcome all forms of contributions!

### Submit Issue

- Use clear title to describe the problem
- Provide reproduction steps and environment info
- Attach relevant screenshots or logs

### Submit Pull Request

1. Fork this repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add some feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

### Code Standards

- Write code in TypeScript
- Follow ESLint configuration
- Commit messages follow [Conventional Commits](https://conventionalcommits.org/) specification

---

## 📄 License

This project is open source under the [MIT](LICENSE) license.

---

<div align="center">

**Made with ❤️ by CodeGraph Team**

If this project helps you, please give us a ⭐️ Star!

</div>
