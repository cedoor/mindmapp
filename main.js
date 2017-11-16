const electron = require("electron"),
    {app, BrowserWindow} = electron,
    path = require("path"),
    args = process.argv.slice(1),
    serve = args.some(val => val === "--dev");

if (serve) require("electron-reload")(__dirname, {});

let mainWindow, loadingScreen;

function createLoadingScreen() {
    const entryPath = path.join("file://", __dirname, "loading.html");

    loadingScreen = new BrowserWindow({
        icon: __dirname + "/icon.png",
        width: 800,
        height: 600,
        frame: false
    });

    loadingScreen.loadURL(entryPath);

    loadingScreen.on("closed", () => {
        loadingScreen = null;
    });
}

function createMainWindow() {
    const indexPath = path.join("file://", __dirname, "index.html"),
        size = electron.screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    mainWindow = new BrowserWindow({
        icon: __dirname + "/icon.png",
        x: 0, y: 0,
        width: size.width, minWidth: 800,
        height: size.height, minHeight: 700,
        show: false
    });

    mainWindow.loadURL(indexPath);

    // Open the DevTools.
    if (serve) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", () => {
    createLoadingScreen();
    createMainWindow();

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

