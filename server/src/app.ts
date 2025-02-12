import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import { config } from "./config";
import sequelize from "./config/database";
import errorHandler from "./middleware/errorHandler";
import routes from "./routes";
import path from "path";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../ssl/")));

// All routes
app.use(routes);

// Error handler
app.use(errorHandler);

if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Database connection check
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

export default app;
