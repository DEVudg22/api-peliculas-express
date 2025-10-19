import express from "express";
import bodyParser from "body-parser";
import peliculas from "./routes/peliculas.js";

import cors from "cors";

//const cors = require("cors");

const app = express();
const PORT = 5000;

/*app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    optionsSuccessStatus: 200,
  })
);*/
app.use(cors());
app.use(bodyParser.json());
app.use("/peliculas", peliculas);

//GET

app.get("/", (req, res) => {
  console.log("[GET ROUTE]");
  res.send("Hola mundo");
});

//Mensaje de que todo funciona correctamente
app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`)
);
