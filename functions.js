import sqlite3 from "sqlite3";
//crear base de datos
export function createDatabase() {
  console.log("Creando la BD");
  let db = new sqlite3.Database("./movies.db", (err) => {
    console.log("Iniciando la creación");
    if (err) {
      console.log("Error: " + err);
      return false;
    } else {
      console.log("Creando tabla películas");
      db.exec(`create table peliculas(
id text,
name text,
year text,
sinopsis text,
cover text
);
insert into peliculas values('1','Los tipos malos 2', '2025', 'Un genial equipo de animales que no respetan la ley, los ahora muy reformados Tipos Malos, se esfuerzan (mucho, muchísimo) en ser buenos, pero se ven envueltos involuntariamente en un golpe de envergadura mundial planeado por un inesperado grupo de criminales: las Tipas Malas.', 'https://pics.filmaffinity.com/the_bad_guys_2-780518548-mmed.jpg');

`);
    }
  });
  db.close();
  return true;
}
