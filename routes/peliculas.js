import express from "express";
import { v4 as uuidv4 } from "uuid";
import sqlite3 from "sqlite3";
const router = express.Router();

// Obtener las películas
router.get("/", (req, res) => {
  let db = new sqlite3.Database("./movies.db");
  db.all("SELECT * FROM peliculas", function (err, rows) {
    let peliculas = JSON.stringify(rows);
    res.end(peliculas);
  });
});

//Añadir peliculas

router.post("/", (req, res) => {
  const _id = uuidv4();
  const _name = req.body.name;
  const _sinopsis = req.body.sinopsis;
  const _year = req.body.year;
  const _cover = req.body.cover;
  let db = new sqlite3.Database("./movies.db");
  let resultado = db.run(
    `insert into peliculas (id, name, year, sinopsis, cover) values(?, ?, ?, ?, ?);`,
    [_id, _name, _year, _sinopsis, _cover]
  );
  res.end("OK");
});

//Consultar una película por medio de su id

router.get("/:id", (req, res) => {
  const { id } = req.params;

  let db = new sqlite3.Database("./movies.db");
  let resultado = db.get(
    `SELECT * FROM peliculas WHERE id =
?;`,
    [id],
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      if (row) {
        console.log("Registro encontrado:", row);
        res.end(JSON.stringify(row));
      } else {
        console.log("No se encontró ningún registro.");
      }
    }
  );
});

//Eliminar una película

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let db = new sqlite3.Database("./movies.db");
  let resultado = db.run(
    `DELETE from peliculas where id =
?`,
    [id]
  );
  res.end("OK");
});

//Actualizar película
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, year, sinopsis, cover } = req.body;

  if (name) {
    let db = new sqlite3.Database("./movies.db");
    let resultado = db.run(
      `UPDATE peliculas SET name = ? WHERE id = ?`,
      [name, id],
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Se actualizó el campo nombre con id: ${id}.`);
      }
    );
  }
  if (year) {
    let db = new sqlite3.Database("./movies.db");
    let resultado = db.run(
      `UPDATE peliculas SET year = ? WHERE id = ?`,
      [year, id],
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Se actualizó el campo year con id: ${id}.`);
      }
    );
  }
  if (sinopsis) {
    let db = new sqlite3.Database("./movies.db");
    let resultado = db.run(
      `UPDATE peliculas SET sinopsis = ? WHERE id = ?`,
      [sinopsis, id],
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Se actualizó el campo sinopsis con id: ${id}.`);
      }
    );
  }
  if (cover) {
    let db = new sqlite3.Database("./movies.db");
    let resultado = db.run(
      `UPDATE peliculas SET cover = ? WHERE id = ?`,
      [cover, id],
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Se actualizó el campo nombre con id: ${id}.`);
      }
    );
  }

  res.send(`Película con ID: ${id} fue actualizada con éxito`);
});

export default router;
