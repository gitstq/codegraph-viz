import { create } from 'zustand'
import { GraphNode, GraphEdge, AnalysisResult, FileNode } from '../types'

interface GraphState {
  // 数据
  nodes: GraphNode[]
  edges: GraphEdge[]
  files: FileNode[]
  selectedNode: string | null
  
  // 状态
  isAnalyzing: boolean
  analysisProgress: number
  error: string | null
  
  // 视图设置
  showFiles: boolean
  showFunctions: boolean
  showClasses: boolean
  showImports: boolean
  
  // 动作
  setNodes: (nodes: GraphNode[]) => void
  setEdges: (edges: GraphEdge[]) => void
  setFiles: (files: FileNode[]) => void
  setSelectedNode: (id: string | null) => void
  
  setIsAnalyzing: (value: boolean) => void
  setAnalysisProgress: (progress: number) => void
  setError: (error: string | null) => void
  
  toggleShowFiles: () => void
  toggleShowFunctions: () => void
  toggleShowClasses: () => void
  toggleShowImports: () => void
  
  reset: () => void
  
  // 从分析结果构建图谱
  buildGraphFromResult: (result: AnalysisResult) => void
}

const initialState = {
  nodes: [],
  edges: [],
  files: [],
  selectedNode: null,
  isAnalyzing: false,
  analysisProgress: 0,
  error: null,
  showFiles: true,
  showFunctions: true,
  showClasses: true,
  showImports: true,
}

export const useGraphStore = create<GraphState>((set, get) => ({
  ...initialState,
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setFiles: (files) => set({ files }),
  setSelectedNode: (id) => set({ selectedNode: id }),
  
  setIsAnalyzing: (value) => set({ isAnalyzing: value }),
  setAnalysisProgress: (progress) => set({ analysisProgress: progress }),
  setError: (error) => set({ error }),
  
  toggleShowFiles: () => set((state) => ({ showFiles: !state.showFiles })),
  toggleShowFunctions: () => set((state) => ({ showFunctions: !state.showFunctions })),
  toggleShowClasses: () => set((state) => ({ showClasses: !state.showClasses })),
  toggleShowImports: () => set((state) => ({ showImports: !state.showImports })),
  
  reset: () => set(initialState),
  
  buildGraphFromResult: (result) => {
    const nodes: GraphNode[] = []
    const edges: GraphEdge[] = []
    const nodeMap = new Map<string, boolean>()
    
    // 添加文件节点
    result.files.forEach((file, index) => {
      if (file.type === 'file') {
        const nodeId = `file-${file.id}`
        nodeMap.set(nodeId, true)
        
        // 计算网格位置
        const cols = Math.ceil(Math.sqrt(result.files.length))
        const row = Math.floor(index / cols)
        const col = index % cols
        const spacing = 250
        
        nodes.push({
          id: nodeId,
          type: 'file',
          label: file.name,
          data: {
            name: file.name,
            path: file.path,
            language: file.language,
            lineCount: file.content?.split('\n').length || 0,
          },
          position: {
            x: col * spacing + 100,
            y: row * spacing + 100,
          },
        })
      }
    })
    
    // 添加符号节点（函数、类）
    result.symbols.forEach((symbol, index) => {
      const nodeId = `symbol-${symbol.id}`
      const parentFileId = `file-${symbol.fileId}`
      
      if (nodeMap.has(parentFileId)) {
        nodeMap.set(nodeId, true)
        
        const parentNode = nodes.find(n => n.id === parentFileId)
        const offsetX = (index % 3) * 150
        const offsetY = Math.floor(index / 3) * 80 + 150
        
        nodes.push({
          id: nodeId,
          type: symbol.type === 'function' ? 'function' : symbol.type === 'class' ? 'class' : 'interface',
          label: symbol.name,
          data: {
            name: symbol.name,
            path: parentNode?.data.path,
            lineCount: symbol.lineEnd - symbol.lineStart + 1,
          },
          position: {
            x: (parentNode?.position.x || 0) + offsetX,
            y: (parentNode?.position.y || 0) + offsetY,
          },
        })
        
        // 添加包含关系边
        edges.push({
          id: `edge-contains-${symbol.id}`,
          source: parentFileId,
          target: nodeId,
          type: 'contains',
        })
      }
    })
    
    // 添加关系边
    result.relationships.forEach((rel) => {
      const sourceId = rel.type === 'imports' ? `file-${rel.source}` : `symbol-${rel.source}`
      const targetId = rel.type === 'imports' ? `file-${rel.target}` : `symbol-${rel.target}`
      
      if (nodeMap.has(sourceId) && nodeMap.has(targetId)) {
        edges.push({
          id: `edge-${rel.id}`,
          source: sourceId,
          target: targetId,
          type: rel.type,
          animated: rel.type === 'calls',
        })
      }
    })
    
    set({ nodes, edges, files: result.files })
  },
}))
