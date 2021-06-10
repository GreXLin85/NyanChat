const { app, BrowserWindow, ipcMain } = require("electron");
const { io } = require("socket.io-client");
const Crypto = require("./classes/crypto");

function getRandomPass() {
  /* thanks stackoverflow lol */
  var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return String(
    Array(32)
      .join()
      .split(",")
      .map(function () {
        return s.charAt(Math.floor(Math.random() * s.length));
      })
      .join("")
  );
}
const crypto = new Crypto(getRandomPass());

let window, otherUsersPublicKey, socket;

app.whenReady().then(() => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
    },
  });

  window.loadURL("http://localhost:3000");
});

//electron

ipcMain.addListener("messageFromReact", (event, arg) => {
  socket.emit(
    "message",
    crypto.encrypt(arg, otherUsersPublicKey).cipher,
    socket.id
  );
  window.webContents.send("messageFromMe", true, socket.id, arg);
});

ipcMain.addListener("socketIP", (event, arg) => {
  socket = io(arg, {
    query: {
      publicKey: crypto.publicKey,
    },
  });
  socket.on("connect", function () {
    console.log("Connected!");
    window.webContents.send("socketController", arg);
  });
  socket.on("disconnect", function () {
    console.log("Disconnected!");
  });
  socket.on("connect_failed", function () {
    window.webContents.send("socketError");
  });
  socket.on("keyBroadcast", (key) => {
    otherUsersPublicKey = key;
    socket.emit("keyBroadcastFromFirstUser", crypto.publicKey);
  });

  socket.on("keyBroadcastFromFirstUsersSocket", (key) => {
    otherUsersPublicKey = key;
  });

  socket.on("messageFromSocket", (data) => {
    console.log(data[0]);
    window.webContents.send(
      "newMessageFromServer",
      false,
      data[0],
      crypto.decrypt(data[1]).plaintext
    );
  });
});

// socket io
