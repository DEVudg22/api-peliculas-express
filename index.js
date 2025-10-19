import express from "express";
import bodyParser from "body-parser";
import peliculas from "./routes/peliculas.js";

import cors from "cors";
import sqlite3 from "sqlite3";
import { createDatabase } from "./functions.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/peliculas", peliculas);

//GET

app.get("/", (req, res) => {
  console.log("[GET ROUTE]");
  res.send("Hola mundo");
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  let db = new sqlite3.Database(
    "./movies.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err && err.code == "SQLITE_CANTOPEN") {
        db.close();
        console.log("Iniciando la creación de la base de datos");
        createDatabase();
        return;
      } else if (err) {
        console.log("Error" + err);
        exit(1);
      } else {
        console.log("Despliegue de la base de datos ejecutado con éxito");
      }
    }
  );
  console.log("Servidor escuchando en http://%s:%s", host, port);
});
