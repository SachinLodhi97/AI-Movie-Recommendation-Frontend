import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const value = e.target.value;
    setQ(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/search?query=${value}`,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      },
    );

    const data = await res.json();
    setSuggestions(data);
  };

  const goToMovie = (id) => {
    setQ("");
    setSuggestions([]);
    navigate(`/movie/${id}`);
  };

  const searchMovie = () => {
    if (q) {
      navigate(`/search?q=${q}`);
      setSuggestions([]);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🎬 Movie Recommendation System</h2>

      <div className="search-box">
        <input
          value={q}
          onChange={handleChange}
          placeholder="Search movies..."
        />

        <button onClick={searchMovie}>Search</button>

        {suggestions.length > 0 && (
          <div className="dropdown">
            {suggestions.map((m) => (
              <div
                key={m.id}
                className="dropdown-item"
                onClick={() => goToMovie(m.id)}
              >
                {m.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
