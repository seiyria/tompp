import { app, BrowserWindow, screen, ipcMain, ipcRenderer } from 'electron';
import * as Config from 'electron-config';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

const config = new Config();

function createWindow(): BrowserWindow {

  const opts: any = { 
    show: false
  };

  const screenSize = screen.getPrimaryDisplay().size;

  Object.assign(opts, config.get('winBounds') || {});

  if(!opts.height) opts.height = 768;
  if(!opts.width) opts.width = 1024;

  if(!opts.x) opts.x = screenSize.width / 2 - opts.width / 2;
  if(!opts.y) opts.y = screenSize.height / 2 - opts.height / 2;

  // Create the browser window.
  win = new BrowserWindow({
    ...opts,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
    },
  });

  if(serve) {

    require('devtron').install();
    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.setMenu(null);

  win.once('ready-to-show', win.show);

  win.on('close', () => {
    config.set('winBounds', win.getBounds());
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

const dir = process.env.PORTABLE_EXECUTABLE_DIR;

const getExecutable = () => {
  const executable = {
    darwin: 'macos',
    linux: 'linux',
    win32: 'win.exe'
  };

  return path.join(dir, `types-of-mania-${executable[process.platform]}`);
}

ipcMain.on('debug', e => e.reply('display-message', JSON.stringify({ cwd: process.env.INIT_CWD, exe: process.env.PORTABLE_EXECUTABLE_DIR, app: app.getAppPath(), exec: process.execPath, dot: path.resolve('.') })))

ipcMain.on('get-version', (event) => {
  try {

    const version = childProcess.execFileSync(
      getExecutable(), 
      ['--version']
    );

    event.reply('set-version', version.toString());
  } catch(e) {
    console.error('Could not get app version.');
    console.error(e);
  }
});

ipcMain.on('run-app', (event, opts) => {
  try {

    const args = [`--configJson=${JSON.stringify(opts.config)}`];
    if(opts.dumpStats) args.push(`--dumpStats`);

    childProcess.execFile(
      getExecutable(), 
      args,
      (err, stdout) => {
        if(err) {
          event.reply('display-error', err);
          return;
        }

        console.log(stdout.toString());
        event.reply('display-message', stdout.toString());
      }
    );

  } catch(e) {

    fs.writeFileSync(dir + '/error.log', e);

    console.error('Could not run app: ', e);
    console.error(e);

    event.reply('display-error', 'Could not run app: ', e.message || e);
  }
});

try {

  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

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
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
