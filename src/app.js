import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("db connection ok");
});

const app = express();

app.use(express.json());

routes(app);

export default app;

// b9VyeNZ66vhs9YPZ
