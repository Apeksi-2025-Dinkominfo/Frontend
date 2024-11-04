import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import FormRoutes from "./routes/formRoutes.js"
import NewsRoutes from "./routes/newsRoutes.js"
import LoginRoutes from "./routes/loginRoutes.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use(express.json());
app.use(FormRoutes);
app.use(NewsRoutes);
app.use(LoginRoutes);

app.listen(process.env.APP_PORT, () =>{
    console.log("Server Up and Running....");
});