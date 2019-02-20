// Módulos para controlar la vida de la aplicación y crear una ventana de navegador nativa
const {app, BrowserWindow} = require('electron')

// Mantenga una referencia global del objeto de la ventana, si no lo hace, la ventana
// se cerrará automáticamente cuando el objeto de JavaScript se recoja.
let mainWindow

function createWindow () {
  // Crear la ventana del navegador.

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y cargar el index.html de la aplicación.
  //mainWindow.loadFile('index.html')

  console.log('ejecutando ...')
  var url = 'file://' + __dirname + '/../www/index.html';
  console.log(url)
  var Args = process.argv.slice(2);
  Args.forEach(function (val) {
      if (val === "test") {
          url = 'http://localhost:8100'
      }
  });
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL(url);
   // Abre el DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitido cuando la ventana está cerrada.
  mainWindow.on('closed', function () {
    // Dereferir el objeto de la ventana, usualmente usted almacenaría las ventanas.
    // en una matriz si tu aplicación es compatible con múltiples ventanas, este es el momento
    // cuando debes eliminar el elemento correspondiente.
    mainWindow = null
  })
}

// Este método será llamado cuando Electron haya terminado.
// inicialización y está listo para crear ventanas del navegador.
// Algunas API solo se pueden usar después de este evento.
app.on('ready', createWindow)

// Salir cuando todas las ventanas están cerradas.
app.on('window-all-closed', function () {
  // En macOS es común para aplicaciones y su barra de menú
  // permanecer activo hasta que el usuario se cierre explícitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // se hace clic en el icono del dock y no hay otras ventanas abiertas.
  if (mainWindow === null) {
    createWindow()
  }
})