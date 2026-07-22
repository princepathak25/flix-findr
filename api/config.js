export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";
  const response = await fetch(
    `${TMDB_BASE_URL}${endpoint}${separator}api_key=${process.env.TMDB_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("TMDB request failed");
  }
  return response.json();
}
