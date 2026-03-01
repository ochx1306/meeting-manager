const http = require('http')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const PORT = 3000
const exeDir = path.dirname(process.execPath)
const distDir = path.join(exeDir, 'dist')

// 拡張子ごとのMIMEタイプ定義
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

const server = http.createServer((req, res) => {
  // リクエストURLからファイルパスを生成（ルートアクセスは index.html に）
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url)
  let extname = String(path.extname(filePath)).toLowerCase()

  fs.stat(filePath, (err, stats) => {
    // ファイルが存在しない場合はSPAのルーティングとして index.html を返す
    if (err || !stats.isFile()) {
      filePath = path.join(distDir, 'index.html')
      extname = '.html'
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500)
        res.end('Server Error')
      } else {
        const contentType = mimeTypes[extname] || 'application/octet-stream'
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(content, 'utf-8')
      }
    })
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  // Windowsのデフォルトブラウザを開くコマンド
  exec(`start http://localhost:${PORT}`)
})
