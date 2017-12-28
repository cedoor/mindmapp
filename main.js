const electron = require("electron"),
    {app, BrowserWindow} = electron,
    path = require("path"),
    args = process.argv.slice(1),
    serve = args.some(val => val === "--dev");

if (serve) require("electron-reload")(__dirname, {});

let mainWindow, loadingScreen;

function createLoadingScreen(size) {
    const entryPath = path.join("file://", __dirname, "loading.html");

    loadingScreen = new BrowserWindow({
        icon: __dirname + "/assets/icon/png/64x64.png",
        x: size.width / 2 - 400,
        y: size.height / 2 - 300,
        width: 800,
        height: 600,
        frame: false
    });

    loadingScreen.loadURL(entryPath);

    loadingScreen.on("closed", () => {
        loadingScreen = null;
    });
}

function createMainWindow(size) {
    const indexPath = path.join("file://", __dirname, "index.html");

    mainWindow = new BrowserWindow({
        icon: __dirname + "/assets/icon/png/64x64.png",
        x: 0, y: 0,
        width: size.width, minWidth: 800,
        height: size.height, minHeight: 700,
        show: false
    });

    mainWindow.loadURL(indexPath);

    if (serve) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", () => {
    let size = electron.screen.getPrimaryDisplay().workAreaSize;

    createLoadingScreen(size);
    createMainWindow(size);

    setTimeout(() => {
        mainWindow.show();
        loadingScreen.close();
    }, 2000);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

