import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

//middlewares
// Allow origins from env or sensible defaults (local dev + deployed frontend)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,https://ai-chatbot-ab.onrender.com").split(",").map(o => o.trim());

app.use(cors({
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) return callback(null, true);
		return callback(new Error(`CORS policy: origin ${origin} not allowed`));
	},
	credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;