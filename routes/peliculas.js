import express from "express";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

//Peliculas de prueba
let movies = [
  {
    id: "1",
    name: "Los Tipos Malos 2",
    year: 2025,
    sinopsis:
      "Un genial equipo de animales que no respetan la ley, los ahora muy reformados Tipos Malos, se esfuerzan (mucho, muchísimo) en ser buenos, pero se ven envueltos involuntariamente en un golpe de envergadura mundial planeado por un inesperado grupo de criminales: las Tipas Malas.",
    cover: "https://pics.filmaffinity.com/the_bad_guys_2-780518548-mmed.jpg",
  },
  {
    id: "2",
    name: "Gran Turismo",
    year: 2023,
    sinopsis:
      "Un adolescente jugaba a 'Gran Turismo', videojuego en el que ganó una serie de competiciones patrocinadas por Nissan, y le sirvió de trampolín para acabar convirtiéndose en un piloto de carreras profesional. ",
    cover: "https://pics.filmaffinity.com/gran_turismo-126311186-mmed.jpg",
  },
];

// Obtener las películas
router.get("/", (req, res) => {
  res.send(movies);
});

//Añadir peliculas

router.post("/", (req, res) => {
  const movie = req.body;
  movies.push({ ...movie, id: uuidv4() });
  res.send(`${movies.name} ha sido añadido con éxito`);
});

//Consultar una película por medio de su id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movies) => movies.id === id);
  res.send(movie);
});

//Eliminar una película

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const moviesTemp = movies.filter((movies) => movies.id !== id);
  movies = moviesTemp;
  res.send(`${id} Fue eliminado con éxito`);
});

//Actualizar película
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, year, sinopsis, cover } = req.body;
  let movieTemp = movies.find((movies) => movies.id === id);
  if (name) movieTemp.name = name;
  if (year) movieTemp.year = year;
  if (sinopsis) movieTemp.sinopsis = sinopsis;
  if (cover) movieTemp.cover = cover;
  res.send(`Película con ID: ${id} fue actualizada con éxito`);
});

export default router;
