import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

require("./model/db");

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", require("./users/route"));
app.use("/api/staff", require("./staff/route"));
app.use("/api/admin", require("./admin/route"));

export default app;
