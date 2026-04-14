import { useEffect, useState } from "react";
import api from "../api";
import MovieCard from "../components/MovieCard";
import { useSearchParams, useNavigate } from "react-router-dom";

function Search() {
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("q");

  useEffect(() => {
    if (!query) return;

    api.get(`/search?query=${query}`).then((res) => {
      setResults(res.data);

      if (res.data.length > 0) {
        const firstMovieId = res.data[0].id;

        api.get(`/movie/${firstMovieId}`).then((r) => {
          setRecommendations(r.data.recommendations);
        });
      }
    });
  }, [query]);

  return (
    <div className="page">
      <h2>🔍 Search Results for "{query}"</h2>

      <div className="movie-row">
        {results.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onClick={() => navigate(`/movie/${m.id}`)}
          />
        ))}
      </div>

      {recommendations.length > 0 && (
        <>
          <h2 style={{ marginTop: "30px" }}>🤖 Recommended for you</h2>

          <div className="movie-row">
            {recommendations.map((m) => (
              <MovieCard
                key={m.title}
                movie={m}
                onClick={() => navigate(`/movie/${m.id}`)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
