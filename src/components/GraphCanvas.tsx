import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  NodeProps,
  Handle,
  Position,
  Panel,
} from 'reactflow'
import { useGraphStore } from '../store/graphStore'
import { FileCode, FunctionSquare, Layers, Maximize2 } from 'lucide-react'

interface GraphCanvasProps {
  onNodeClick: (node: any) => void
}

// 自定义节点组件 - 文件节点
const FileNode = ({ data, selected }: NodeProps) => (
  <div className={`
    px-4 py-3 rounded-lg border-2 transition-all duration-200 min-w-[140px]
    ${selected 
      ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/30' 
      : 'bg-dark-800 border-blue-500/50 hover:border-blue-400'
    }
  `}>
    <Handle type="target" position={Position.Top} className="!bg-blue-500" />
    <div className="flex items-center gap-2">
      <FileCode className="w-5 h-5 text-blue-400" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-100 truncate">{data.name}</div>
        <div className="text-xs text-gray-500">{data.language}</div>
      </div>
    </div>
    <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
      <span>{data.lineCount} 行</span>
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
  </div>
)

// 自定义节点组件 - 函数节点
const FunctionNode = ({ data, selected }: NodeProps) => (
  <div className={`
    px-3 py-2 rounded-full border-2 transition-all duration-200 min-w-[120px]
    ${selected 
      ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/30' 
      : 'bg-dark-800 border-green-500/50 hover:border-green-400'
    }
  `}>
    <Handle type="target" position={Position.Left} className="!bg-green-500" />
    <div className="flex items-center gap-2">
      <FunctionSquare className="w-4 h-4 text-green-400" />
      <span className="text-sm font-medium text-gray-100 truncate">{data.name}</span>
    </div>
    <Handle type="source" position={Position.Right} className="!bg-green-500" />
  </div>
)

// 自定义节点组件 - 类节点
const ClassNode = ({ data, selected }: NodeProps) => (
  <div className={`
    px-4 py-3 rounded-lg border-2 transition-all duration-200 min-w-[140px]
    ${selected 
      ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/30' 
      : 'bg-dark-800 border-purple-500/50 hover:border-purple-400'
    }
  `}>
    <Handle type="target" position={Position.Top} className="!bg-purple-500" />
    <div className="flex items-center gap-2">
      <Layers className="w-5 h-5 text-purple-400" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-100 truncate">{data.name}</div>
        <div className="text-xs text-purple-400">class</div>
      </div>
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
  </div>
)

const nodeTypes = {
  file: FileNode,
  function: FunctionNode,
  class: ClassNode,
}

export default function GraphCanvas({ onNodeClick }: GraphCanvasProps) {
  const { nodes: storeNodes, edges: storeEdges, showFiles, showFunctions, showClasses, showImports } = useGraphStore()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [fitView, setFitView] = useState(false)

  // 根据过滤器更新节点和边
  useEffect(() => {
    const filteredNodes = storeNodes.filter(node => {
      if (node.type === 'file' && !showFiles) return false
      if (node.type === 'function' && !showFunctions) return false
      if (node.type === 'class' && !showClasses) return false
      return true
    })

    const nodeIds = new Set(filteredNodes.map(n => n.id))
    
    const filteredEdges = storeEdges.filter(edge => {
      if (!showImports && edge.type === 'imports') return false
      return nodeIds.has(edge.source) && nodeIds.has(edge.target)
    })

    setNodes(filteredNodes.map(n => ({
      ...n,
      data: { ...n.data },
    })))
    
    setEdges(filteredEdges.map(e => ({
      ...e,
      style: { 
        stroke: e.type === 'imports' ? '#eab308' : e.type === 'calls' ? '#22c55e' : '#6b7280',
        strokeWidth: e.type === 'contains' ? 1 : 2,
      },
      markerEnd: {
        type: 'arrowclosed',
        color: e.type === 'imports' ? '#eab308' : e.type === 'calls' ? '#22c55e' : '#6b7280',
      },
    })))
  }, [storeNodes, storeEdges, showFiles, showFunctions, showClasses, showImports, setNodes, setEdges])

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    onNodeClick(node)
  }, [onNodeClick])

  const handleFitView = useCallback(() => {
    setFitView(true)
    setTimeout(() => setFitView(false), 100)
  }, [])

  // 导出图谱事件监听
  useEffect(() => {
    const handleExport = () => {
      const graphData = {
        nodes: storeNodes,
        edges: storeEdges,
        exportedAt: new Date().toISOString(),
      }
      const blob = new Blob([JSON.stringify(graphData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `codegraph-export-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    window.addEventListener('export-graph' as any, handleExport)
    return () => window.removeEventListener('export-graph' as any, handleExport)
  }, [storeNodes, storeEdges])

  return (
    <div className="w-full h-full bg-dark-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView={fitView}
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
      >
        <Background 
          color="#374151" 
          gap={20} 
          size={1}
          variant="dots"
        />
        <Controls className="!bg-dark-800 !border-gray-700" />
        <MiniMap 
          className="!bg-dark-800 !border-gray-700"
          nodeColor={(node) => {
            switch (node.type) {
              case 'file': return '#3b82f6'
              case 'function': return '#22c55e'
              case 'class': return '#a855f7'
              default: return '#6b7280'
            }
          }}
          maskColor="rgba(30, 30, 46, 0.8)"
        />
        <Panel position="top-right" className="m-4">
          <button
            onClick={handleFitView}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Maximize2 className="w-4 h-4" />
            适应视图
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}
