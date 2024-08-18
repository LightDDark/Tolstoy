const request = require('supertest')
const express = require('express')
const { app, server } = require('./server')

describe('POST /fetch-metadata', () => {
  test('returns 400 if less than 3 URLs are provided', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://example.com', 'https://example.org'] })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Please provide at least 3 valid URLs')
  })

  test('returns metadata for valid URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://google.com', 'https://something.org/', 'https://www.amazon.com/'] })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
    expect(response.body[0]).toHaveProperty('title')
    expect(response.body[0]).toHaveProperty('description')
    expect(response.body[0]).toHaveProperty('image')
    expect(response.body[1]).toHaveProperty('title')
    expect(response.body[1]).toHaveProperty('description')
    expect(response.body[1]).toHaveProperty('image')
    expect(response.body[2]).toHaveProperty('title')
    expect(response.body[2]).toHaveProperty('description')
    expect(response.body[2]).toHaveProperty('image')
  })

  afterAll((done) => {
    server.close(done)
  })
})
