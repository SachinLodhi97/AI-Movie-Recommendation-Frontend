import { useEffect, useState } from "react";
import api from "../api";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [bollywood, setBollywood] = useState([]);
  const [hollywood, setHollywood] = useState([]);
  const [tollywood, setTollywood] = useState([]);
  const [south, setSouth] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/category/bollywood").then((res) => setBollywood(res.data));
    api.get("/category/hollywood").then((res) => setHollywood(res.data));
    api.get("/category/tollywood").then((res) => setTollywood(res.data));
    api.get("/category/south").then((res) => setSouth(res.data));
  }, []);

  return (
    <div className="page">
      <div className="row">
        <h2>🔥 Bollywood Trending</h2>
        <div className="movie-row">
          {bollywood.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => navigate(`/movie/${m.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="row">
        <h2>🎬 Hollywood Trending</h2>
        <div className="movie-row">
          {hollywood.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => navigate(`/movie/${m.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="row">
        <h2>🌟 Tollywood Trending</h2>
        <div className="movie-row">
          {tollywood.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => navigate(`/movie/${m.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="row">
        <h2>🇮🇳 South Indian Trending</h2>
        <div className="movie-row">
          {south.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => navigate(`/movie/${m.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
