import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
