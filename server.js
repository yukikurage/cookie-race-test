// Cookie race condition test
const http = require("http");
const fs = require("fs").promises;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const server = http.createServer();

server.on("request", async (req, res) => {
  switch (req.url) {
    case "/500":
      await delay(500);
      res.setHeader("Set-Cookie", "hoge=500");
      break;
    case "/1000":
      await delay(1000);
      res.setHeader("Set-Cookie", "hoge=1000");
      break;
    case "/":
      res.setHeader("Content-Type", "text/html");
      // read client.html file
      const clientHTML = await fs.readFile("./client.html");
      res.write(clientHTML);
      break;
    default:
      break;
  }
  res.end();
});

server.listen(3000);
