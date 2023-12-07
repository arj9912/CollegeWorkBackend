import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./src/utils/db.js";
import indexRouter from "./src/routes/indexRoute.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";

dotenv.config({ path: ".env" });
const app = express();

const PORT = process.env.PORT || 5000;

// Logging the HTTP request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Connect to MongoDB
connectDB
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.log("MongoDB connection failed");
  });

// Routes
app.use("/api/v1", indexRouter);

// Error handler
app.use(errorHandler);

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
