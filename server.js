import express from "express";
import { createServer } from "http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "budsin-wisp" });
});

const server = createServer(app);

server.on("upgrade", (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});

server.listen(PORT, () => {
  console.log(`Wisp server corriendo en puerto ${PORT}`);
});
