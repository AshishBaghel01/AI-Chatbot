import app from "./app.js";
import express from "express";

import { connectToDatabase } from "./db/connections.js";

//connections and listeneres
const PORT = process.env.PORT || 5000;
connectToDatabase()

  .then(() => {
    app.listen(PORT, () =>
      console.log("Server Open & Connected To Database 🤟")
    );
  })
  .catch((err) => console.log(err));