export interface FileNode {
  id: string
  name: string
  path: string
  type: 'file' | 'directory'
  language?: string
  size: number
  content?: string
}

export interface CodeSymbol {
  id: string
  name: string
  type: 'function' | 'class' | 'interface' | 'variable' | 'import' | 'export'
  fileId: string
  lineStart: number
  lineEnd: number
  signature?: string
  documentation?: string
}

export interface CodeRelationship {
  id: string
  source: string
  target: string
  type: 'imports' | 'calls' | 'extends' | 'implements' | 'contains'
}

export interface GraphNode {
  id: string
  type: 'file' | 'function' | 'class' | 'interface'
  label: string
  data: {
    name: string
    path?: string
    language?: string
    lineCount?: number
    symbolCount?: number
    content?: string
  }
  position: { x: number; y: number }
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  type: 'imports' | 'calls' | 'extends' | 'contains'
  animated?: boolean
}

export interface AnalysisResult {
  files: FileNode[]
  symbols: CodeSymbol[]
  relationships: CodeRelationship[]
}

export interface LanguageConfig {
  name: string
  extensions: string[]
  parser: string
  color: string
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { name: 'TypeScript', extensions: ['.ts', '.tsx'], parser: 'typescript', color: '#3178c6' },
  { name: 'JavaScript', extensions: ['.js', '.jsx', '.mjs'], parser: 'javascript', color: '#f7df1e' },
  { name: 'Python', extensions: ['.py'], parser: 'python', color: '#3776ab' },
  { name: 'Java', extensions: ['.java'], parser: 'java', color: '#b07219' },
  { name: 'Go', extensions: ['.go'], parser: 'go', color: '#00add8' },
  { name: 'Rust', extensions: ['.rs'], parser: 'rust', color: '#dea584' },
  { name: 'C++', extensions: ['.cpp', '.cc', '.cxx', '.hpp'], parser: 'cpp', color: '#f34b7d' },
  { name: 'C', extensions: ['.c', '.h'], parser: 'c', color: '#555555' },
  { name: 'Ruby', extensions: ['.rb'], parser: 'ruby', color: '#701516' },
  { name: 'PHP', extensions: ['.php'], parser: 'php', color: '#4F5D95' },
]
