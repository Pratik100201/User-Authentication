import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

/* Initializing express */
const app = express();

/* dotenv file configuration for further use */
dotenv.config();

/* Database connect*/
connectDB();

/* middleware  */

app.use(express.json()); /*We can now send req/res in json({}) file also */
app.use(morgan("dev"));

/*PORT Decclaration */
const PORT = process.env.PORT;

/* Routing */
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
  });
});

app.listen(PORT, () => {
  console.log(`Port is running on http//:localhost:${PORT}`.bgBlack.white);
});
