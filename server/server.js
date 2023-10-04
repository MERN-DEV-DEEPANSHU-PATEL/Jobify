import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import connectDB from "./db/connect.js";
import morgan from "morgan";
import notFoundMiddleWare from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import authenticateUser from "./middleware/auth.js";

dotenv.config();
const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // If you need to include cookies in the request
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", authenticateUser, jobRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
      .then(() => console.log("Database Connected"))
      .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
          console.log("Server Started on " + port + " Port");
        });
      })
      .catch((err) => console.log("Error : ", err));
  } catch (error) {
    console.log("DataBase Error" + error);
  }
};

start();
