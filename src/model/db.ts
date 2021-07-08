// Bring Mongoose into the app
import mongoose from "mongoose";

const dbURI = process.env.DATABASEURI;

// Create the database connection
if (dbURI) {
	mongoose.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} else {
	console.error("Mongoose did not open a connection.");
}

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function () {
	console.log("Mongoose default connection open to " + dbURI);
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
	console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
	console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
	mongoose.connection.close(function () {
		console.log(
			"Mongoose default connection disconnected through app termination"
		);
		process.exit(0);
	});
});

// BRING IN YOUR SCHEMAS & MODELS //
require("../model/user");
