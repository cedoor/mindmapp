const electron = require("electron");
const {app, BrowserWindow} = electron;
const path = require("path");
const {autoUpdater} = require("electron-updater");
const log = require("electron-log");

const args = process.argv.slice(1);
const dev = args.some(val => val === "--dev");

if (dev) {
    require("electron-reload")(__dirname, {});
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

let mainWindow, loadingScreen;

function createLoadingScreen(screenSize) {
    const entryPath = path.join("file://", __dirname, "dist/loading.html"),
        width = 500,
        height = 300;

    loadingScreen = new BrowserWindow({
        icon: __dirname + "/resources/icons/128x128.png",
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
    const indexPath = path.join("file://", __dirname, "dist/index.html");

    mainWindow = new BrowserWindow({
        icon: __dirname + "/resources/icons/128x128.png",
        x: 0,
        y: 0,
        width: screenSize.width,
        height: screenSize.height,
        minWidth: 800,
        minHeight: 700,
        show: false
    });

    mainWindow.setMenu(null);

    mainWindow.loadURL(indexPath);

    if (dev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", () => {
    autoUpdater.checkForUpdatesAndNotify();

    let screenSize = electron.screen.getPrimaryDisplay().bounds;

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

