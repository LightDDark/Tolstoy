const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const helmet = require('helmet')
const { RateLimiterMemory } = require('rate-limiter-flexible')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(helmet())
app.use(express.json())

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 1,
})

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next()
    })
    .catch(() => {
      res.status(429).send('Too Many Requests')
    })
})

async function fetchMetadata(url) {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || ''
    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      ''
    const image = $('meta[property="og:image"]').attr('content') || ''

    return { title, description, image }
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error.message)
    return { title: '', description: '', image: '' }
  }
}

app.post('/fetch-metadata', async (req, res) => {
  const { urls } = req.body

  if (!Array.isArray(urls) || urls.length < 3) {
    return res.status(400).json({ error: 'Please provide at least 3 valid URLs' })
  }

  try {
    const results = await Promise.all(urls.map(fetchMetadata))
    res.json(results)
  } catch (error) {
    console.error('Error processing request:', error)
    res.status(500).json({ error: 'An error occurred while processing your request' })
  }
})

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = { app, server }
