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

var socket = io("http://localhost:3001", {
  reconnect: true,
  query: {
    publicKey: crypto.publicKey,
  },
});

let window, otherUsersPublicKey;

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

// socket io

socket.on("connect", function (socket) {
  console.log("Connected!");
});
socket.on("disconnect", function (socket) {
  console.log("Disconnected!");
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
