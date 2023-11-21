const { app, BrowserWindow, ipcMain } = require('electron')
// app: 它负责着您应用程序的事件生命周期
// BrowserWindow: 它负责创建和管理应用窗口

const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // 将脚本附在渲染进程上
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

// 只有在 app 模块的 ready 事件触发后才能创建 BrowserWindows 实例
app.whenReady().then(() => {
    // 在 html 文件加载之前完成监听，才能在渲染器发送 invoke 调用之前处理程序准备就绪
    ipcMain.handle('ping', () => 'pong')

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// 关闭一个应用的所有窗口后，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // 此方法不适用于 macOS
        app.quit()
    }
})