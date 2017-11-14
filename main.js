const electron = require("electron");
const {app, BrowserWindow} = electron;

let win, serve;

const args = process.argv.slice(1);
serve = args.some(val => val === "--dev");

if (serve) require("electron-reload")(__dirname, {});

function createWindow() {

    const size = electron.screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width, minWidth: 800,
        height: size.height, minHeight: 700,
        icon: __dirname + "/icon.png"
    });

    // and load the index.html of the app.
    win.loadURL("file://" + __dirname + "/index.html");

    // Open the DevTools.
    if (serve) {
        win.webContents.openDevTools();
    }

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

