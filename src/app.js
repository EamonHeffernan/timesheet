"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("./model/db");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", require("./users/route"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
//# sourceMappingURL=app.js.map