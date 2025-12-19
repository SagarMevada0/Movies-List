import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (!title || !rating) return;

    setMovies([
      ...movies,
      {
        id: Date.now(),
        title: title,
        rating: rating,
      },
    ]);

    setTitle("");
    setRating("");
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div style={{ }}>
      <h1>🎬 Movie List with Rating</h1>

      {/* Input Section */}
      <input
        placeholder="Movie Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Rating (1-5)"
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button onClick={addMovie}>Add Movie</button>

      <hr />

      {/* Display Section */}
      <ul>
        {movies.length === 0 && <p>No movies added</p>}

        {movies.map((movie) => (
          <li key={movie.id}>
            🎥 <b>{movie.title}</b> | ⭐ Rating: {movie.rating}
            <button onClick={() => deleteMovie(movie.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
