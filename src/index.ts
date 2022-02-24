import express from "express";
import dotenv from "dotenv";

import router from "./routes";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
