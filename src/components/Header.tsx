import { GitBranch, RefreshCw, Download, Github } from 'lucide-react'

interface HeaderProps {
  onReset: () => void
  hasGraph: boolean
}

export default function Header({ onReset, hasGraph }: HeaderProps) {
  const handleExport = () => {
    // 导出图谱为JSON
    const event = new CustomEvent('export-graph')
    window.dispatchEvent(event)
  }

  return (
    <header className="h-16 glass-panel border-b border-gray-700/50 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
          <GitBranch className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            CodeGraph-Viz
          </h1>
          <p className="text-xs text-gray-400">代码知识图谱可视化工具</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {hasGraph && (
          <>
            <button
              onClick={handleExport}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              导出图谱
            </button>
            <button
              onClick={onReset}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              重新开始
            </button>
          </>
        )}
        <a
          href="https://github.com/yourusername/codegraph-viz"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </header>
  )
}
