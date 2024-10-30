// ===================================

const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const { spawn } = require("child_process");

let filePath = process.argv[2];

let system = process.platform;

const filename = path.join(__dirname, filePath);

if (!filename) return util.puts("Usage: node <server.js> <filename>");

//-------------------- Node.js Server

httpServer = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(__dirname + "/public/index.html", function (err, data) {
    res.write(data, "utf-8");
    res.end();
  });
});
httpServer.listen(8000, "localhost");

//-------------------- настройка сокета
const wsServer = new WebSocket.Server({ server: httpServer });

wsServer.on("connection", function (client) {
  console.log("Соединение установлено");

  let tail = null;
  // Обработка полученных сообщений
  client.on("message", (messageValue) => {
    // формирование команды в зависимости от операционной сисиемы
    if (system === "win32") {
      tail = spawn("powershell", [
        "Get-Content",
        "-Path",
        JSON.stringify(filename),
        "-Wait",
        "-Tail " + messageValue,
        "-Encoding UTF8",
      ]);
    } else if (system === "linux") {
      tail = spawn("tail", ["-f", "-n " + messageValue, filename]);
    }

    tail.stdout.on("data", function (data) {
      if (data.toString("utf8").trim() !== "") {
        client.send(data.toString("utf8"));
      }
    });

    tail.stderr.on("data", function (data) {
      client.send(
        "Неправильно указаны путь и/или название файла, или файл отсутствует в необходимой директории"
      );
    });
  });

  client.on("close", () => {
    tail.kill("SIGKILL");
    console.log("Соединение закрыто");
  });
});

console.log(
  "Сервер работает на http://localhost:8000/, перейтите по ссылке в браузере"
);
