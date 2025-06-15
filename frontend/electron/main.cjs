const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 1000,
    fullscreen: false,
    resizable: true,
    maximizable: false,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Важно! В режиме разработки используем localhost:5173
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173')
    // Открываем DevTools в режиме разработки
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})