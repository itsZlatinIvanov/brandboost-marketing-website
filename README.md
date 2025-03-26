# CLYC Video Review Platform

A comprehensive platform for video review and feedback, with integration for Notion and Google Drive.

## Features

- Video upload and management
- Commenting system with timestamps
- Project management with Notion integration
- Client portal for review and feedback
- Role-based access control

## Quick Start

### Prerequisites

- Docker Desktop installed and running
- Node.js 18+ (for local development outside Docker)

### Starting the Platform

The easiest way to start the platform is using the provided script:

```bash
./start-clyc.sh
```

This will start all necessary services:
- Web application (http://localhost:3000)
- PostgreSQL database
- MinIO storage (console: http://localhost:9001)

### Manual Startup

If you prefer to start services manually:

```bash
# Start all services
docker compose up -d

# Start only specific services
docker compose up -d db storage

# Restart a service
docker compose restart api

# Stop all services
docker compose down
```

### Default User Accounts

The system is pre-configured with the following test accounts:

- **Admin**: admin@example.com / password
- **Client**: client@example.com / password
- **Editor**: editor@example.com / password

## Development

### Environment Variables

Environment variables are configured in:
- `docker-compose.yml` for Docker services
- `.env` for local development

A template file `.env.example` is provided for reference.

### Database

The database schema is automatically initialized when the PostgreSQL container starts. If you need to reset the database:

```bash
# Remove volumes and restart
docker compose down -v
docker compose up -d
```

### Adding New Users/Clients

Use the API or database tools to add new users and clients. Example SQL:

```sql
-- Connect to database
docker exec -it clyc-website-db-1 psql -U postgres -d clyc

-- Add a new client
INSERT INTO clients (company_name, contact_name, email) 
VALUES ('New Company', 'Contact Name', 'contact@example.com');
```

## External Integrations

### Google Drive

Used for storing and managing video files. Configuration:
- Service account credentials configured in environment variables

### Notion

Used for project management. Configuration:
- Notion API key configured in environment variables
- Integration needs appropriate permissions in Notion workspace

## Troubleshooting

### Cannot Connect to Services

Ensure Docker is running and the containers are up:

```bash
docker ps
```

### Database Issues

If database issues occur, you can reset the database:

```bash
docker compose down -v
docker compose up -d
```

### API Errors

Check the logs for the API service:

```bash
docker logs clyc-website-api-1
```
