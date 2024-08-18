import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import App from './App'

jest.mock('axios')

describe('App component', () => {
  test('renders URL input fields', () => {
    render(<App />)
    const inputFields = screen.getAllByPlaceholderText('Enter URL')
    expect(inputFields).toHaveLength(3)
  })

  test('displays error message on failed request', async () => {
    axios.post.mockRejectedValue(new Error('Network error'))
    render(<App />)

    fireEvent.click(screen.getByText('Fetch Metadata'))

    await waitFor(() => {
      expect(
        screen.getByText('An error occurred while fetching metadata. Please try again.'),
      ).toBeInTheDocument()
    })
  })

  test('displays fetched metadata', async () => {
    const mockData = [
      { title: 'Test Title 1', description: 'Test Description 1', image: 'test1.jpg' },
      { title: 'Test Title 2', description: 'Test Description 2', image: 'test2.jpg' },
    ]
    axios.post.mockResolvedValue({ data: mockData })

    render(<App />)
    fireEvent.click(screen.getByText('Fetch Metadata'))

    await waitFor(() => {
      expect(screen.getByText('Test Title 1')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Test Description 1')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Test Title 2')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Test Description 2')).toBeInTheDocument()
    })
  })

  test('handles URL input changes', () => {
    render(<App />)
    const inputFields = screen.getAllByPlaceholderText('Enter URL')

    fireEvent.change(inputFields[0], { target: { value: 'https://example.com' } })
    expect(inputFields[0].value).toBe('https://example.com')
  })

  test('submits form with entered URLs', async () => {
    axios.post.mockResolvedValue({ data: [] })
    render(<App />)

    const inputFields = screen.getAllByPlaceholderText('Enter URL')
    fireEvent.change(inputFields[0], { target: { value: 'https://example.com' } })
    fireEvent.change(inputFields[1], { target: { value: 'https://example.org' } })
    fireEvent.change(inputFields[2], { target: { value: 'https://example.net' } })

    fireEvent.click(screen.getByText('Fetch Metadata'))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/fetch-metadata', {
        urls: ['https://example.com', 'https://example.org', 'https://example.net'],
      })
    })
  })
})
