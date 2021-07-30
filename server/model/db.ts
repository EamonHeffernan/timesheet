// Bring Mongoose into the app
import mongoose from "mongoose";

const dbURI = process.env.DATABASEURI;

export const initMongoConnection = (): Promise<typeof mongoose> => {
	// Create the database connection
	if (dbURI) {
		const connectionPromise = mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true,
		});

		// CONNECTION EVENTS
		// When successfully connected
		mongoose.connection.on("connected", function () {
			console.log("Mongoose connection open to " + dbURI);
		});

		// If the connection throws an error
		mongoose.connection.on("error", function (err) {
			console.log("Mongoose connection error: " + err);
		});

		// When the connection is disconnected
		mongoose.connection.on("disconnected", function () {
			console.log("Mongoose connection disconnected");
		});

		// If the Node process ends, close the Mongoose connection
		process.once("SIGINT", close("SIGINT"));

		// BRING IN SCHEMAS & MODELS
		require("./user");

		return connectionPromise;
	} else {
		console.error("Mongoose did not open a connection.");
		return;
	}
};

const close = (code) => {
	return () => {
		mongoose.connection.close(() => {
			console.log(
				"Mongoose default connection disconnected through app termination"
			);
			process.kill(process.pid, code);
		});
	};
};
