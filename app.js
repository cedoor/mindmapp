const electron = require("electron");
const {app, BrowserWindow} = electron;
const path = require("path");

const args = process.argv.slice(1);
const dev = args.some(val => val === "--dev");

if (dev) {
    require("electron-reload")(__dirname, {});
}

function createMainWindow(screenSize) {
    const indexPath = path.join("file://", __dirname, "dist/index.html");

    let mainWindow = new BrowserWindow({
        icon: __dirname + "/resources/icons/128x128.png",
        x: 0,
        y: 0,
        width: screenSize.width,
        height: screenSize.height,
        minWidth: 900,
        minHeight: 720
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
    let screenSize = electron.screen.getPrimaryDisplay().bounds;

    createMainWindow(screenSize);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Share process arguments
global.arguments = process.argv;

require("./main/update");

