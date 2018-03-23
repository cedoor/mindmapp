const electron = require("electron"),
    {app, BrowserWindow} = electron,
    path = require("path"),
    args = process.argv.slice(1),
    serve = args.some(val => val === "--dev");

if (serve) require("electron-reload")(__dirname, {});

let mainWindow, loadingScreen;

function createLoadingScreen(screenSize) {
    const entryPath = path.join("file://", __dirname, "loading.html"),
        width = 500,
        height = 300;

    loadingScreen = new BrowserWindow({
        icon: __dirname + "/assets/icon/png/64x64.png",
        x: screenSize.width / 2 - width / 2,
        y: screenSize.height / 2 - height / 2,
        width: width,
        height: height,
        frame: false
    });

    loadingScreen.loadURL(entryPath);

    loadingScreen.on("closed", () => {
        loadingScreen = null;
    });
}

function createMainWindow(screenSize) {
    const indexPath = path.join("file://", __dirname, "index.html");

    mainWindow = new BrowserWindow({
        icon: __dirname + "/assets/icon/png/64x64.png",
        x: 0, y: 0,
        width: screenSize.width, minWidth: 800,
        height: screenSize.height, minHeight: 700,
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
    let screenSize = electron.screen.getPrimaryDisplay().workAreaSize;

    createLoadingScreen(screenSize);
    createMainWindow(screenSize);

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

