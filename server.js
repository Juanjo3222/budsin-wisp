import express from "express";
import { createServer } from "http";
import pkg from "wisp-server-node";
const { WispServer } = pkg;
const app = express();
const PORT = process.env.PORT || 8080;

// CORS para Cloudflare Pages
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "budsin-wisp" });
});

const server = createServer(app);
const wispServer = new WispServer({ server, prefix: "/wisp/" });

server.listen(PORT, () => {
  console.log(`Wisp server corriendo en puerto ${PORT}`);
});
