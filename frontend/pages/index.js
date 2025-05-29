import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  // Auto search while typing
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
        setResults(response.data);
      } catch (err) {
        setError('Failed to fetch data.');
      }

      setLoading(false);
    };

    const delayDebounce = setTimeout(fetchResults, 400);
    return () => clearTimeout(delayDebounce); // clear if still typing
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setButtonClicked(true); 
  };

  return (
    <div className="container py-5">
      {/* <h1 className="text-center mb-4">🎧 Podcast Search</h1> */}
      <h1 className="text-center mb-4" style={{ fontSize: '2.5rem' }}>
  🎧 <span style={{ fontWeight: '600'}}>Podcast Search </span>
</h1>


      
      <form onSubmit={handleSearch} className="position-relative d-flex mb-5">

        <input
          type="text"
          className="form-control me-2"
          placeholder="Search podcasts (e.g. فنجان, tech)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setButtonClicked(false); // reset message when typing
          }}
          style= {{backgroundColor: '#daddec'}}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
              setError('');
              setButtonClicked(false);
            }}
            className="btn btn-sm btn-outline-secondary position-absolute"
            style={{
              right: '89px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              padding: '0.25rem 0.5rem',
              fontSize: '1rem',
            }}
          >
            &times;
          </button>
        )}

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {results.map((podcast, i) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
            {/* <div className="card h-100" style={{ maxWidth: '100%', fontSize: '0.9rem' }}>
              <img
                src={podcast.image}
                className="card-img-top"
                alt={podcast.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h6 className="card-title">{podcast.title}</h6>
                <p className="card-text text-muted" style={{ fontSize: '0.85rem' }}>
                  {podcast.author}
                </p>
                <a
                  href={podcast.link}
                  className="btn btn-sm btn-outline-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Listen
                </a>
              </div>
            </div> */}
            <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px', backgroundColor: '#daddec', color: '#111111' }}>
  <img
    src={podcast.image}
    className="card-img-top"
    alt={podcast.title}
    style={{ height: '160px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
  />

  <div className="card-body">
    <h6 className="card-title fw-bold" style={{ fontWeight: '600', fontSize: '1rem' }}>{podcast.title}</h6>

    <p className="card-text text-dark" style={{ fontSize: '0.85rem' }}>{podcast.author}</p>
    <a
      href={podcast.link}
      className="btn btn-sm btn-outline-primary"
      target="_blank"
      rel="noreferrer"
    >
      Listen
    </a>
  </div>
</div>

          </div>
        ))}

        {/* Only show if button clicked AND no results AND not loading */}
        {!loading && buttonClicked && query.trim() && results.length === 0 && !error && (
          <div className="text-center text-white mt-3">
            🔍 No results found for "<strong>{query}</strong> "
          </div>
        )}
      </div>
    </div>
  );
}
