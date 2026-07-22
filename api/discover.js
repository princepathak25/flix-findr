import { tmdbFetch } from "./config.js";

export default async function handler(req, res) {
  try {
    const genreId = req.query.genre;
    if (!genreId) {
      return res.status(400).json({
        error: "Genre id required",
      });
    }
    
    const data = await tmdbFetch(`/discover/movie?with_genres=${genreId}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
