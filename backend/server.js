import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDb } from "./config/databaseConncetion.js";
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
dotenv.config();
connectDb();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({Success: "Server running"});
})

app.use('/api/auth', authRouter);
app.use('/api', profileRouter);
app.use('/api', jobRouter);

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})