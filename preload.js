const { contextBridge, ipcRenderer } = require('electron')
// 预加载脚本包含在浏览器窗口加载网页之前运行的代码。 其可访问 DOM 接口和 Node.js 环境，
// 并且经常在其中使用 contextBridge 接口将特权接口暴露给渲染器。

// 渲染进程 无法 直接访问 Node.js 接口，主进程 无法 直接访问 HTML 文档对象模型 (DOM)
// 可以使用进程间通信 (IPC)，使用 Electron 的 ipcMain 模块和 ipcRenderer 模块来进行进程间通信
// 网页向主进程发送信息，可以使用 ipcMain.handle 设置一个主进程处理程序（handler），在预处理脚本中暴露一个被称为 ipcRenderer.invoke 的函数来触发该处理程序（handler）

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})

