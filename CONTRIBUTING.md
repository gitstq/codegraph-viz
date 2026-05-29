# 🤝 Contributing to CodeGraph-Viz

感谢您对 CodeGraph-Viz 的兴趣！我们欢迎所有形式的贡献。

## 🚀 如何贡献

### 报告 Bug

- 使用清晰的标题描述问题
- 提供复现步骤
- 说明您的操作系统和浏览器版本
- 附上相关截图或错误日志

### 提交功能请求

- 描述您想要的功能
- 解释为什么这个功能会有帮助
- 如果可能，提供实现思路

### 提交代码

1. **Fork** 本仓库
2. **Clone** 您的 Fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/codegraph-viz.git
   ```
3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **提交更改**
   ```bash
   git commit -m "feat: 添加某个功能"
   ```
5. **推送到您的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **创建 Pull Request**

## 📝 提交信息规范

我们使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

示例：
```
feat: 添加 Python 代码分析支持
fix: 修复大文件上传时的内存问题
docs: 更新 README 中的安装说明
```

## 🎯 开发指南

### 项目结构

```
codegraph-viz/
├── src/
│   ├── components/    # React 组件
│   ├── store/         # 状态管理
│   ├── utils/         # 工具函数
│   └── types/         # 类型定义
├── public/            # 静态资源
└── ...
```

### 代码规范

- 使用 TypeScript 编写所有代码
- 遵循现有的代码风格
- 添加必要的注释
- 确保通过 ESLint 检查

### 测试

在提交 PR 之前，请确保：

1. 代码可以正常构建：`npm run build`
2. 没有 TypeScript 错误
3. 功能在本地测试通过

## 📞 联系我们

如有任何问题，欢迎：

- 创建 [Issue](https://github.com/gitstq/codegraph-viz/issues)
- 发送邮件至：codegraph@example.com

再次感谢您的贡献！
