import { X, FileCode, FunctionSquare, Layers, GitCommit, MapPin } from 'lucide-react'

interface NodeDetailsProps {
  node: any
  onClose: () => void
}

export default function NodeDetails({ node, onClose }: NodeDetailsProps) {
  const getNodeIcon = () => {
    switch (node.type) {
      case 'file':
        return <FileCode className="w-5 h-5 text-blue-400" />
      case 'function':
        return <FunctionSquare className="w-5 h-5 text-green-400" />
      case 'class':
        return <Layers className="w-5 h-5 text-purple-400" />
      default:
        return <GitCommit className="w-5 h-5 text-gray-400" />
    }
  }

  const getNodeTypeLabel = () => {
    switch (node.type) {
      case 'file':
        return '文件'
      case 'function':
        return '函数'
      case 'class':
        return '类'
      default:
        return '未知'
    }
  }

  const getNodeColor = () => {
    switch (node.type) {
      case 'file':
        return 'border-blue-500/50 bg-blue-500/10'
      case 'function':
        return 'border-green-500/50 bg-green-500/10'
      case 'class':
        return 'border-purple-500/50 bg-purple-500/10'
      default:
        return 'border-gray-500/50 bg-gray-500/10'
    }
  }

  return (
    <div className="absolute right-4 top-4 bottom-4 w-80 glass-panel border-l border-gray-700/50 flex flex-col slide-in z-40">
      {/* 头部 */}
      <div className={`p-4 border-b border-gray-700/50 ${getNodeColor()}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getNodeIcon()}
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{getNodeTypeLabel()}</div>
              <h3 className="text-lg font-semibold text-white">{node.data.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* 内容 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 基本信息 */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">基本信息</h4>
          <div className="space-y-2 text-sm">
            {node.data.path && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 break-all">{node.data.path}</span>
              </div>
            )}
            {node.data.language && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">语言:</span>
                <span className="text-gray-300">{node.data.language}</span>
              </div>
            )}
            {node.data.lineCount !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">代码行数:</span>
                <span className="text-gray-300">{node.data.lineCount} 行</span>
              </div>
            )}
            {node.data.symbolCount !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">符号数量:</span>
                <span className="text-gray-300">{node.data.symbolCount} 个</span>
              </div>
            )}
          </div>
        </div>

        {/* 位置信息 */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">图谱位置</h4>
          <div className="text-sm text-gray-400">
            X: {Math.round(node.position.x)}, Y: {Math.round(node.position.y)}
          </div>
        </div>

        {/* 节点ID */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">节点ID</h4>
          <code className="text-xs bg-dark-800 px-2 py-1 rounded text-gray-400 break-all">
            {node.id}
          </code>
        </div>
      </div>

      {/* 底部操作 */}
      <div className="p-4 border-t border-gray-700/50">
        <button
          onClick={onClose}
          className="w-full btn-secondary text-sm"
        >
          关闭
        </button>
      </div>
    </div>
  )
}
