import express from "express";
import { fetchData } from "../controllers/getJobs.js";

const jobRouter = express.Router();

jobRouter.get('/jobs', fetchData);

export default jobRouter;
