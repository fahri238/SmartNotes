import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import noteRoutes from "./routes/index.js";
import initRelations from "./models/InitRelaton.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/avatars", express.static("public/avatars"));
app.use(noteRoutes);

initRelations()

app.listen(5000, () => console.log("Server running at port 5000"));
