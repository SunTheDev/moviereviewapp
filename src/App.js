import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [info, setInfo] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((res) => setInfo(res.data));
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setInfo((info) => [...info, { movieName: movieName, movieReview: review }]);
    setMovieName("");
    setReview("");
  };

  const deleteMovie = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>React App with mySQL</h1>
      <div className="input-boxes">
        <label htmlFor="movie">Movie:</label>
        <input
          type="text"
          name="movie"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label htmlFor="review">Review:</label>
        <input
          type="text"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={submitReview}>Submit</button>
        {info.map((i) => (
          <div className="card">
            <h2>{i.movieName}</h2>
            <p>{i.movieReview}</p>
            <button
              onClick={() => {
                deleteMovie(i.movieName);
              }}
            >
              Delete
            </button>
            <input
              type="text"
              id="updateInput"
              placeholder="update review..."
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button
              onClick={() => {
                updateReview(i.movieName);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
