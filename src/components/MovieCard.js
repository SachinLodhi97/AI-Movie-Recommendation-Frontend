function MovieCard({ movie, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={movie.poster} />
      <p>{movie.title}</p>
    </div>
  );
}

export default MovieCard;
