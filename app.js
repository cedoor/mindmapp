const electron = require("electron");
const {app, BrowserWindow} = electron;
const path = require("path");
const arguments = process.argv.slice(1);
const serve = arguments.some(val => val === "--serve");

let mainWindow;

function createMainWindow() {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    mainWindow = new BrowserWindow({
        icon: __dirname + "/resources/icons/128x128.png",
        x: 0,
        y: 0,
        width,
        height,
        minWidth: 900,
        minHeight: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });
        mainWindow.loadURL('http://localhost:4200');
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    if (serve) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.setMenu(null);

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createMainWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createMainWindow();
        }
    });

} catch (error) {
    // Catch Error
    throw error;
}

