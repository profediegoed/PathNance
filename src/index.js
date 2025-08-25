import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/users.routes.js";
import dotenv from 'dotenv';
import helmet from "helmet";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

const PORT= process.env.PORT;

app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);


app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
