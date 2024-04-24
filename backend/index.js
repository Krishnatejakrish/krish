import express from "express";
import mongoose from "mongoose";
import { PORT, MongoUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();
app.use(express.json());

// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors())

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome to book store");
});

app.use("/books", booksRoute);

mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });
