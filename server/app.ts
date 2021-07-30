import express from "express";
import next from "next";
import config, { prod } from "./config";
import router from "./routes/router";

export * from "./config";

const nodePackage = require("../package.json");

export const nextApp = next({ dev: !prod, dir: "./" + nodePackage.dirs.next });
const handle = nextApp.getRequestHandler();
const app = express();

config(app);
router(app, handle);

export default app;
