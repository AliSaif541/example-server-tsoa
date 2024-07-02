import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import {petsRouter} from "../http/routes/petRoutes";
import {RegisterRoutes} from "../http/routes/routes";
import {petsRouter} from "../http/routes/petRoutes";
import cors from "cors";

export const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);
// app.use("/petsapp/pet", petsRouter);
app.use(express.json());
app.use(cors());
app.use("/petsapp/pet", petsRouter);

app.listen(Number(3020), () => {
    console.log(`DEV Server running on port ${3020}`);
});
