import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      // Simulate a search request by using a timeout
      setLoading(true);
      setTimeout(() => {
        // Example static search results (replace this with an actual API call)
        const mockData = [
          { id: 1, name: 'Product 1', description: 'Description of product 1' },
          { id: 2, name: 'Product 2', description: 'Description of product 2' },
          { id: 3, name: 'Product 3', description: 'Description of product 3' },
        ];

        // Filter the mock data to simulate search results
        const filteredResults = mockData.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
        setLoading(false);
      }, 1000); // Simulated loading time
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (results.length === 0) {
    return <div>No results found for "{query}"</div>;
  }

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
