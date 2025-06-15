import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow = null;

async function createWindow() {
    try {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: false,
                preload: path.join(__dirname, 'preload.js')
            }
        });

        if (process.env.VITE_DEV_SERVER_URL) {
            await mainWindow.loadURL('http://localhost:5173');
            mainWindow.webContents.openDevTools();
        } else {
            await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
        }

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    } catch (err) {
        console.error('Ошибка при создании окна:', err);
    }
}

app.whenReady()
    .then(createWindow)
    .catch(err => {
        console.error('Ошибка при запуске приложения:', err);
        app.quit();
    });

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', async () => {
    try {
        // Очистка ресурсов перед выходом
        await cleanup();
        
        if (process.platform !== 'darwin') {
            app.quit();
        } else {
            console.log('Приложение продолжает работать в фоне на macOS');
        }
    } catch (error) {
        console.error('Ошибка при закрытии приложения:', error);
        // Принудительное завершение в случае ошибки
        process.exit(1);
    }
});

app.on('before-quit', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});

async function cleanup() {
    // Здесь код для очистки ресурсов
    // например: закрытие соединений с БД, очистка временных файлов и т.д.
}