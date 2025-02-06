import express from "express";
import { config as configDotenv } from "dotenv";
import ConnectDB from "./config/DBConnection"
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRoutes";
import taskRouter from "./routes/TaskRoutes";
import cors from "cors";
import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);




configDotenv();
ConnectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173', 
//   credentials: true
// }));



app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);


app.use(express.static(path.join(__dirname, "../client/dist")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
}
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});