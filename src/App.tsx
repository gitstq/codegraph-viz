import { useState, useCallback } from 'react'
import { ReactFlowProvider } from 'reactflow'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import GraphCanvas from './components/GraphCanvas'
import FileUploader from './components/FileUploader'
import NodeDetails from './components/NodeDetails'
import { useGraphStore } from './store/graphStore'
import 'reactflow/dist/style.css'

function App() {
  const [showUploader, setShowUploader] = useState(true)
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const { nodes, edges, isAnalyzing, analysisProgress } = useGraphStore()

  const handleFilesSelected = useCallback(() => {
    setShowUploader(false)
    // 文件处理逻辑在FileUploader组件中完成
  }, [])

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const handleReset = useCallback(() => {
    setShowUploader(true)
    setSelectedNode(null)
    useGraphStore.getState().reset()
  }, [])

  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen flex flex-col bg-dark-900 overflow-hidden">
        <Header 
          onReset={handleReset}
          hasGraph={nodes.length > 0}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar 
            nodeCount={nodes.length}
            edgeCount={edges.length}
            isAnalyzing={isAnalyzing}
            progress={analysisProgress}
          />
          
          <main className="flex-1 relative">
            {showUploader ? (
              <div className="h-full flex items-center justify-center p-8">
                <FileUploader 
                  onFilesSelected={handleFilesSelected}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            ) : (
              <GraphCanvas 
                onNodeClick={handleNodeClick}
              />
            )}
            
            {selectedNode && (
              <NodeDetails 
                node={selectedNode}
                onClose={handleCloseDetails}
              />
            )}
          </main>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default App
