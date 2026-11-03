# Lockr

Lockr is a secure vault application for storing and managing sensitive information in one place. This version uses MongoDB for persistent data storage.

## Features

- Create and manage vault entries
- Store sensitive data in an organized interface
- MongoDB-backed persistence
- Simple, responsive web experience

## Tech Stack

- Node.js
- Express.js
- MongoDB
- HTML, CSS, and JavaScript

## Getting Started

### Prerequisites

- Node.js and npm
- A running MongoDB instance or MongoDB Atlas database

### Installation

1. Clone the repository and move into the project directory:

	```bash
	git clone <repository-url>
	cd Lockr-mongo
	```

2. Install dependencies:

	```bash
	npm install
	```

3. Create `backend/.env` and add the configuration required by the application. For example:

	```env
	PORT=3000
	MONGO_URI=mongodb://127.0.0.1:27017/lockr
	```

4. Start the backend in one terminal:

	```bash
	npm run backend
	```

5. Start the frontend in another terminal:

	```bash
	npm run dev
	```

## Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Port used by the server |
| `MONGO_URI` | MongoDB connection string |

Keep `.env` out of version control and never commit real credentials or sensitive vault data.

## Project Structure

The project is organized around a Node.js/Express server, application routes and logic, frontend assets, and MongoDB data access. Refer to the source directories for the exact structure.

## Security

Lockr is intended for educational and development use unless additional security controls have been implemented. Use strong credentials, protect environment variables, validate user input, and enable authentication and encryption before storing real secrets.

## License

No license has been specified yet.
