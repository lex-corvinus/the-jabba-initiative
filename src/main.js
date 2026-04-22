const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {

    const win = new BrowserWindow({
        width: 500,
        height: 450,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        hasShadow: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.on('open-logs-window', (event) => {
        const webContents = event.sender;
        webContents.openDevTools({ mode: 'detach' });
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});