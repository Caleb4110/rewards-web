import http from "http";
import https from "https";
import app from "./app";
import { config } from "./config";
import fs from "fs";

const httpsOptions = {
  key: fs.readFileSync("./ssl/server.key"),
  cert: fs.readFileSync("./ssl/server.cert"),
};

https.createServer(httpsOptions, app).listen(config.port, () => {
  console.log(`Server running at https://localhost:${config.port}`);
});
