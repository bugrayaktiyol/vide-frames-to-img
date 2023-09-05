const { app, BrowserWindow } = require('electron')

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //mainWindow.setMenuBarVisibility(false)
});