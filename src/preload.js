const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

    openLogs: () => ipcRenderer.send('open-logs-window')
});