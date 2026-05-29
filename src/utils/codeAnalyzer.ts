import { FileNode, CodeSymbol, CodeRelationship, AnalysisResult, SUPPORTED_LANGUAGES } from '../types'

// 简单的代码分析器（不依赖 Tree-sitter WASM，使用正则表达式进行基础分析）
// 这样可以确保项目在任何环境下都能正常运行

export async function analyzeCodeFiles(files: File[]): Promise<AnalysisResult> {
  const fileNodes: FileNode[] = []
  const symbols: CodeSymbol[] = []
  const relationships: CodeRelationship[] = []
  
  let symbolIdCounter = 0
  let relIdCounter = 0

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const content = await file.text()
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    
    // 检测语言
    const language = SUPPORTED_LANGUAGES.find(lang => 
      lang.extensions.includes(ext)
    )?.name || 'Unknown'

    const fileId = `file-${i}`
    
    // 创建文件节点
    fileNodes.push({
      id: fileId,
      name: file.name,
      path: file.name,
      type: 'file',
      language,
      size: file.size,
      content,
    })

    // 分析代码符号
    const lines = content.split('\n')
    
    // 根据语言选择分析策略
    if (language === 'TypeScript' || language === 'JavaScript') {
      analyzeJavaScript(content, lines, fileId, symbols, relationships, () => symbolIdCounter++, () => relIdCounter++)
    } else if (language === 'Python') {
      analyzePython(content, lines, fileId, symbols, relationships, () => symbolIdCounter++, () => relIdCounter++)
    } else if (language === 'Java') {
      analyzeJava(content, lines, fileId, symbols, relationships, () => symbolIdCounter++, () => relIdCounter++)
    } else if (language === 'Go') {
      analyzeGo(content, lines, fileId, symbols, relationships, () => symbolIdCounter++, () => relIdCounter++)
    } else {
      // 通用分析
      analyzeGeneric(content, lines, fileId, symbols, relationships, () => symbolIdCounter++, () => relIdCounter++)
    }

    // 分析导入关系
    analyzeImports(content, fileId, fileNodes, relationships, () => relIdCounter++)
  }

  return {
    files: fileNodes,
    symbols,
    relationships,
  }
}

function analyzeJavaScript(
  content: string,
  lines: string[],
  fileId: string,
  symbols: CodeSymbol[],
  relationships: CodeRelationship[],
  getSymbolId: () => number,
  getRelId: () => number
) {
  // 函数匹配模式
  const functionPatterns = [
    // function name() {}
    /function\s+(\w+)\s*\(/g,
    // const name = () => {}
    /(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|\w+)\s*=>/g,
    // method() {}
    /(?:async\s+)?(\w+)\s*\([^)]*\)\s*\{/g,
    // class method
    /(?:async\s+)?(\w+)\s*\([^)]*\)\s*\{/g,
  ]

  // 类匹配模式
  const classPattern = /class\s+(\w+)(?:\s+extends\s+(\w+))?/g

  // 查找函数
  lines.forEach((line, lineIndex) => {
    functionPatterns.forEach(pattern => {
      let match
      const localPattern = new RegExp(pattern.source, 'g')
      while ((match = localPattern.exec(line)) !== null) {
        const name = match[1]
        // 过滤掉关键字
        if (['if', 'while', 'for', 'switch', 'catch'].includes(name)) continue
        
        const symbolId = getSymbolId()
        symbols.push({
          id: `symbol-${symbolId}`,
          name,
          type: 'function',
          fileId,
          lineStart: lineIndex + 1,
          lineEnd: lineIndex + 1,
          signature: match[0].trim(),
        })
      }
    })
  })

  // 查找类
  let classMatch
  while ((classMatch = classPattern.exec(content)) !== null) {
    const symbolId = getSymbolId()
    const lineIndex = content.substring(0, classMatch.index).split('\n').length - 1
    
    symbols.push({
      id: `symbol-${symbolId}`,
      name: classMatch[1],
      type: 'class',
      fileId,
      lineStart: lineIndex + 1,
      lineEnd: lineIndex + 1,
      signature: classMatch[0].trim(),
    })

    // 处理继承关系
    if (classMatch[2]) {
      relationships.push({
        id: `rel-${getRelId()}`,
        source: `symbol-${symbolId}`,
        target: classMatch[2],
        type: 'extends',
      })
    }
  }
}

function analyzePython(
  content: string,
  lines: string[],
  fileId: string,
  symbols: CodeSymbol[],
  relationships: CodeRelationship[],
  getSymbolId: () => number,
  getRelId: () => number
) {
  // 函数定义: def name():
  const funcPattern = /def\s+(\w+)\s*\(/g
  // 类定义: class Name:
  const classPattern = /class\s+(\w+)(?:\(([^)]+)\))?:/g

  // 查找函数
  let funcMatch
  while ((funcMatch = funcPattern.exec(content)) !== null) {
    const symbolId = getSymbolId()
    const lineIndex = content.substring(0, funcMatch.index).split('\n').length - 1
    
    symbols.push({
      id: `symbol-${symbolId}`,
      name: funcMatch[1],
      type: 'function',
      fileId,
      lineStart: lineIndex + 1,
      lineEnd: lineIndex + 1,
      signature: funcMatch[0].trim(),
    })
  }

  // 查找类
  let classMatch
  while ((classMatch = classPattern.exec(content)) !== null) {
    const symbolId = getSymbolId()
    const lineIndex = content.substring(0, classMatch.index).split('\n').length - 1
    
    symbols.push({
      id: `symbol-${symbolId}`,
      name: classMatch[1],
      type: 'class',
      fileId,
      lineStart: lineIndex + 1,
      lineEnd: lineIndex + 1,
      signature: classMatch[0].trim(),
    })
  }
}

function analyzeJava(
  content: string,
  lines: string[],
  fileId: string,
  symbols: CodeSymbol[],
  relationships: CodeRelationship[],
  getSymbolId: () => number,
  getRelId: () => number
) {
  // 方法定义
  const methodPattern = /(?:public|private|protected|static|\s)+[\w<>\[\]]+\s+(\w+)\s*\([^)]*\)\s*\{/g
  // 类定义
  const classPattern = /class\s+(\w+)(?:\s+extends\s+(\w+))?(?:\s+implements\s+([\w,\s]+))?/g

  // 查找方法
  let methodMatch
  while ((methodMatch = methodPattern.exec(content)) !== null) {
    const symbolId = getSymbolId()
    const lineIndex = content.substring(0, methodMatch.index).split('\n').length - 1
    
    symbols.push({
      id: `symbol-${symbolId}`,
      name: methodMatch[1],
      type: 'function',
      fileId,
      lineStart: lineIndex + 1,
      lineEnd: lineIndex + 1,
      signature: methodMatch[0].trim(),
    })
  }

  // 查找类
  let classMatch
  while ((classMatch = classPattern.exec(content)) !== null) {
    const symbolId = getSymbolId()
    const lineIndex = content.substring(0, classMatch.index).split('\n').length - 1
    
    symbols.push({
      id: `symbol-${symbolId}`,
      name: classMatch[1],
      type: 'class',
      fileId,
      lineStart: lineIndex + 1,
      lineEnd: lineIndex + 1,
      signature: classMatch[0].trim(),
    })
  }
}

function analyzeGo(
  content: string,
  lines: string[],
  fileId: string,
  symbols: CodeSymbol[],
  relationships: CodeRelationship[],
  getSymbolId: () => number,
  getRelId: () => number
) {
  // 函数定义: func name()
  const funcPattern = /func\s+(?:\([^)]+\)\s+)?(\w+)\s*\(/g
  // 结构体定义: type Name struct
  const structPattern = /type\s+(\w+)\s+struct/g

  // 查找函数
  let funcMatch
  while ((funcMatch = funcPattern.exec(content)) !== null) {
    const symbolId = getSymbolId()
    const lineIndex = content.substring(0, funcMatch.index).split('\n').length - 1
    
    symbols.push({
      id: `symbol-${symbolId}`,
      name: funcMatch[1],
      type: 'function',
      fileId,
      lineStart: lineIndex + 1,
      lineEnd: lineIndex + 1,
      signature: funcMatch[0].trim(),
    })
  }

  // 查找结构体
  let structMatch
  while ((structMatch = structPattern.exec(content)) !== null) {
    const symbolId = getSymbolId()
    const lineIndex = content.substring(0, structMatch.index).split('\n').length - 1
    
    symbols.push({
      id: `symbol-${symbolId}`,
      name: structMatch[1],
      type: 'class',
      fileId,
      lineStart: lineIndex + 1,
      lineEnd: lineIndex + 1,
      signature: structMatch[0].trim(),
    })
  }
}

function analyzeGeneric(
  content: string,
  lines: string[],
  fileId: string,
  symbols: CodeSymbol[],
  relationships: CodeRelationship[],
  getSymbolId: () => number,
  getRelId: () => number
) {
  // 通用函数匹配 - 尝试识别常见的函数定义模式
  const patterns = [
    // C/C++ 函数
    /\w+[\s*]+(\w+)\s*\([^)]*\)\s*\{/g,
    // Ruby 方法
    /def\s+(\w+)/g,
    // PHP 函数
    /function\s+(\w+)/g,
    // Rust 函数
    /fn\s+(\w+)/g,
  ]

  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      const symbolId = getSymbolId()
      const lineIndex = content.substring(0, match.index).split('\n').length - 1
      
      symbols.push({
        id: `symbol-${symbolId}`,
        name: match[1],
        type: 'function',
        fileId,
        lineStart: lineIndex + 1,
        lineEnd: lineIndex + 1,
        signature: match[0].trim(),
      })
    }
  })
}

function analyzeImports(
  content: string,
  fileId: string,
  files: FileNode[],
  relationships: CodeRelationship[],
  getRelId: () => number
) {
  // 导入语句匹配模式
  const importPatterns = [
    // ES6 import
    /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
    // CommonJS require
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    // Python import
    /(?:from\s+(\S+)\s+)?import\s+(\S+)/g,
    // Java import
    /import\s+([\w.]+)/g,
  ]

  importPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      const importPath = match[1] || match[2]
      if (!importPath) continue

      // 尝试匹配本地文件
      const targetFile = files.find(f => {
        const importName = importPath.split('/').pop()
        return importName && (
          f.name === importName ||
          f.name === `${importName}.ts` ||
          f.name === `${importName}.js` ||
          f.name === `${importName}.py` ||
          f.name === `${importName}.java`
        )
      })

      if (targetFile && targetFile.id !== fileId) {
        relationships.push({
          id: `rel-${getRelId()}`,
          source: fileId,
          target: targetFile.id,
          type: 'imports',
        })
      }
    }
  })
}
