import express from "express";
import cookieParser from "cookie-parser";
require("./model/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", require("./users/route"));
app.use("/api/staff", require("./staff/route"));
app.use("/api/admin", require("./admin/route"));

export default app;
