"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoConnection = void 0;
// Bring Mongoose into the app
const mongoose_1 = __importDefault(require("mongoose"));
const dbURI = process.env.DATABASEURI;
const initMongoConnection = () => {
    // Create the database connection
    if (dbURI) {
        const connectionPromise = mongoose_1.default.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
        });
        // CONNECTION EVENTS
        // When successfully connected
        mongoose_1.default.connection.on("connected", function () {
            console.log("Mongoose connection open to " + dbURI);
        });
        // If the connection throws an error
        mongoose_1.default.connection.on("error", function (err) {
            console.log("Mongoose connection error: " + err);
        });
        // When the connection is disconnected
        mongoose_1.default.connection.on("disconnected", function () {
            console.log("Mongoose connection disconnected");
        });
        // If the Node process ends, close the Mongoose connection
        process.on("SIGINT", function () {
            mongoose_1.default.connection.close(function () {
                console.log("Mongoose default connection disconnected through app termination");
                process.exit(0);
            });
        });
        // BRING IN SCHEMAS & MODELS
        require("./user");
        return connectionPromise;
    }
    else {
        console.error("Mongoose did not open a connection.");
        return;
    }
};
exports.initMongoConnection = initMongoConnection;
