import app from "../app";
import { initMongoConnection } from "../model/db";

const initApp = async () => {
	await initMongoConnection();

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => console.log(`Server started on ${PORT}`));
};

initApp();
