# URL Metadata Fetcher

This full-stack application allows users to input multiple URLs and fetch metadata (title, description, and image) for each URL.

## Setup

1. Clone the repository:
`git clone https://github.com/LightDDark/Tolstoy`

2. Set up the backend:
`cd url-metadata-server`
`npm install`

3. Set up the frontend:
`cd ../url-metadata-fetcher`
`npm install`

## Running the Application

### Using Docker

1. 

### Manually

1. Start the backend server:
`cd url-metadata-server`
`npm start`

3. In a new terminal, start the frontend:
`cd url-metadata-fetcher`
`npm start`

5. Open your browser and navigate to `http://localhost:3000`

## Running Tests

1. For backend tests:
`cd url-metadata-server`
`npm test`

3. For frontend tests:
`cd url-metadata-fetcher`
`npm test`

## Design Choices and Trade-offs

- Used React for the frontend due to its component-based architecture and efficient rendering.
- Implemented rate limiting on the backend to prevent abuse and ensure fair usage.
- Used Cheerio for HTML parsing on the backend as it's lightweight and efficient.
- Implemented basic error handling and input validation to improve user experience and security.
- Trade-off: The current implementation doesn't handle pagination for large numbers of URLs. For a production application, this would need to be addressed.
