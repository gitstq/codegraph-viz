import { useGraphStore } from '../store/graphStore'
import { 
  FileCode, 
  GitCommit, 
  Layers, 
  Settings,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react'

interface SidebarProps {
  nodeCount: number
  edgeCount: number
  isAnalyzing: boolean
  progress: number
}

export default function Sidebar({ nodeCount, edgeCount, isAnalyzing, progress }: SidebarProps) {
  const { 
    showFiles, 
    showFunctions, 
    showClasses, 
    showImports,
    toggleShowFiles,
    toggleShowFunctions,
    toggleShowClasses,
    toggleShowImports,
  } = useGraphStore()

  const filters = [
    { key: 'files', label: '文件节点', icon: FileCode, show: showFiles, toggle: toggleShowFiles, color: 'bg-blue-500' },
    { key: 'functions', label: '函数节点', icon: GitCommit, show: showFunctions, toggle: toggleShowFunctions, color: 'bg-green-500' },
    { key: 'classes', label: '类节点', icon: Layers, show: showClasses, toggle: toggleShowClasses, color: 'bg-purple-500' },
  ]

  return (
    <aside className="w-72 glass-panel border-r border-gray-700/50 flex flex-col">
      {/* 统计信息 */}
      <div className="p-4 border-b border-gray-700/50">
        <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          图谱统计
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-dark-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-primary-400">{nodeCount}</div>
            <div className="text-xs text-gray-500">节点总数</div>
          </div>
          <div className="bg-dark-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-primary-400">{edgeCount}</div>
            <div className="text-xs text-gray-500">关系总数</div>
          </div>
        </div>
      </div>

      {/* 分析进度 */}
      {isAnalyzing && (
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
            <span className="text-sm text-gray-300">正在分析代码...</span>
          </div>
          <div className="w-full bg-dark-800 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">{progress}%</div>
        </div>
      )}

      {/* 视图过滤器 */}
      <div className="p-4 border-b border-gray-700/50 flex-1">
        <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          视图设置
        </h2>
        <div className="space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={filter.toggle}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                filter.show 
                  ? 'bg-dark-800/80 border border-gray-600/50' 
                  : 'bg-dark-800/30 border border-transparent opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${filter.color}`} />
                <span className="text-sm text-gray-300">{filter.label}</span>
              </div>
              {filter.show ? (
                <Eye className="w-4 h-4 text-primary-500" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-600" />
              )}
            </button>
          ))}
        </div>

        {/* 关系类型 */}
        <div className="mt-6">
          <h3 className="text-xs font-medium text-gray-500 mb-2">关系类型</h3>
          <button
            onClick={toggleShowImports}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              showImports 
                ? 'bg-dark-800/80 border border-gray-600/50' 
                : 'bg-dark-800/30 border border-transparent opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-gray-300">导入关系</span>
            </div>
            {showImports ? (
              <Eye className="w-4 h-4 text-primary-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* 图例 */}
      <div className="p-4">
        <h3 className="text-xs font-medium text-gray-500 mb-2">节点图例</h3>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-6 rounded bg-blue-500/20 border border-blue-500/50" />
            <span>文件 (File)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-6 rounded-full bg-green-500/20 border border-green-500/50" />
            <span>函数 (Function)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-6 rounded bg-purple-500/20 border border-purple-500/50" />
            <span>类 (Class)</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
