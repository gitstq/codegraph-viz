import { useCallback, useState, useRef } from 'react'
import { Upload, FolderOpen, FileCode, Loader2, CheckCircle } from 'lucide-react'
import { useGraphStore } from '../store/graphStore'
import { analyzeCodeFiles } from '../utils/codeAnalyzer'

interface FileUploaderProps {
  onFilesSelected: (files: FileList) => void
  isAnalyzing: boolean
}

export default function FileUploader({ onFilesSelected, isAnalyzing }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const { setIsAnalyzing, setAnalysisProgress, buildGraphFromResult, setError } = useGraphStore()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFiles = async (files: File[]) => {
    const codeFiles = files.filter(file => {
      const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
      const codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.go', '.rs', '.cpp', '.c', '.h', '.rb', '.php']
      return codeExtensions.includes(ext)
    })

    setSelectedFiles(codeFiles)
    
    if (codeFiles.length === 0) {
      setError('未找到支持的代码文件，请上传 .ts, .js, .py, .java 等格式的文件')
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setError(null)

    try {
      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const result = await analyzeCodeFiles(codeFiles)
      
      clearInterval(progressInterval)
      setAnalysisProgress(100)
      
      buildGraphFromResult(result)
      onFilesSelected(files as unknown as FileList)
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析过程中出现错误')
      setIsAnalyzing(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const items = e.dataTransfer.items
    const files: File[] = []
    
    const traverseFileTree = (item: any, path: string = '') => {
      if (item.isFile) {
        item.file((file: File) => {
          files.push(file)
        })
      } else if (item.isDirectory) {
        const dirReader = item.createReader()
        dirReader.readEntries((entries: any[]) => {
          entries.forEach(entry => traverseFileTree(entry, path + item.name + '/'))
        })
      }
    }

    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry()
        if (item) traverseFileTree(item)
      }
      
      // 延迟处理以确保文件收集完成
      setTimeout(() => processFiles(files), 100)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      processFiles(files)
    }
  }, [])

  const handleFolderSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      processFiles(files)
    }
  }, [])

  return (
    <div className="w-full max-w-2xl">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${isDragging 
            ? 'border-primary-500 bg-primary-500/10 scale-105' 
            : 'border-gray-600 bg-dark-800/50 hover:border-gray-500 hover:bg-dark-800'
          }
        `}
      >
        {isAnalyzing ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-16 h-16 text-primary-500 animate-spin" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">正在分析代码...</h3>
              <p className="text-gray-400">已选择 {selectedFiles.length} 个文件</p>
            </div>
          </div>
        ) : selectedFiles.length > 0 ? (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">文件已就绪</h3>
              <p className="text-gray-400">{selectedFiles.length} 个代码文件待分析</p>
            </div>
          </div>
        ) : (
          <>
            <div className={`
              w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isDragging 
                ? 'bg-primary-500 shadow-lg shadow-primary-500/50' 
                : 'bg-dark-700'
              }
            `}>
              <Upload className={`w-12 h-12 ${isDragging ? 'text-white' : 'text-gray-400'}`} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              拖拽代码文件到此处
            </h3>
            <p className="text-gray-400 mb-8">
              支持 TypeScript, JavaScript, Python, Java, Go, Rust 等主流语言
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary flex items-center gap-2"
              >
                <FileCode className="w-4 h-4" />
                选择文件
              </button>
              <button
                onClick={() => folderInputRef.current?.click()}
                className="btn-secondary flex items-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                选择文件夹
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".ts,.tsx,.js,.jsx,.py,.java,.go,.rs,.cpp,.c,.h,.rb,.php"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={folderInputRef}
              type="file"
              webkitdirectory=""
              directory=""
              multiple
              onChange={handleFolderSelect}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* 支持的文件类型 */}
      <div className="mt-8 grid grid-cols-4 gap-3">
        {['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'Ruby'].map((lang) => (
          <div 
            key={lang}
            className="px-3 py-2 bg-dark-800/50 rounded-lg text-center text-xs text-gray-400 border border-gray-700/50"
          >
            {lang}
          </div>
        ))}
      </div>

      {/* 隐私提示 */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span>纯本地处理，代码不会上传到服务器</span>
      </div>
    </div>
  )
}
