const information = document.getElementById('info')

// 渲染器访问 versions 可以通过 window.versions 也可以直接使用 versions
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

func()