// src/App.js
import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [urls, setUrls] = useState(['', '', ''])
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls]
    newUrls[index] = value
    setUrls(newUrls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResults([])

    try {
      const response = await axios.post('http://localhost:5000/fetch-metadata', { urls })
      setResults(response.data)
    } catch (err) {
      setError('An error occurred while fetching metadata. Please try again.')
    }
  }

  return (
    <div className="App">
      <h1>URL Metadata Fetcher</h1>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <input
            key={index}
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(index, e.target.value)}
            placeholder="Enter URL"
            required
          />
        ))}
        <button type="submit">Fetch Metadata</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="results">
        {results.map((result, index) => (
          <div key={index} className="result-card">
            <h2>{result.title}</h2>
            <p>{result.description}</p>
            {result.image && <img src={result.image} alt={result.title} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
