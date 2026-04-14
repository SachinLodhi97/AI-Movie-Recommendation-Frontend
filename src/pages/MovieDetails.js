import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showTrailer, setShowTrailer] = useState(true);

  useEffect(() => {
    api.get(`/movie/${id}`).then((res) => setData(res.data));
  }, [id]);

  if (!data) return <p className="page">Loading...</p>;

  return (
    <div className="page">
      <h1>{data.title}</h1>

      {data.trailer && showTrailer && (
        <div className="trailer">
          <div className="close-btn" onClick={() => setShowTrailer(false)}>
            ×
          </div>

          <iframe
            src={data.trailer}
            title="trailer"
            width="100%"
            height="100%"
          />
        </div>
      )}

      <h3>🤖 Recommended</h3>

      <div className="movie-row">
        {data.recommendations.map((m) => (
          <MovieCard key={m.title} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
