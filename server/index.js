import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//database connection
const PORT = process.env.PORT || 5000;

// Get the directory path of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle API requests
// ...

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
// Serve the index.html file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

async function connect() {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log("Mongodb Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

connect();
