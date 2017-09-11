const {app, BrowserWindow} = require("electron"),
    path = require("path"),
    url = require("url"),
    isDev = require("electron-is-dev")

app.on("ready", function () {
    const win = new BrowserWindow({
        width: 1000, minWidth: 800,
        height: 800, minHeight: 700,
        icon: "app/img/icon.png"
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, "app/index.html"),
        protocol: "file:",
        slashes: true
    }))

    if (isDev) {
        const elemon = require("elemon")
        elemon({
            app: app,
            mainFile: "main.js",
            bws: [{
                bw: win,
                res: [
                    "index.html",
                    "layout.css",
                    "init.js",
                    "menu.js",
                    "dialog.js",
                    "actions.js",
                    "app.js"
                ]
            }]
        })
        win.webContents.openDevTools()
    }
})

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit()
})