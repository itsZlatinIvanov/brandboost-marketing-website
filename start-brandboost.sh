#!/bin/bash

# Script to start the BrandBoost Marketing Website

echo "Starting BrandBoost Marketing Website..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Please start Docker Desktop first."
  exit 1
fi

# Start all services
echo "Starting Docker containers..."
docker compose up -d

# Check if containers started successfully
if [ $? -eq 0 ]; then
  echo "✅ BrandBoost Marketing Website is now running!"
  echo "🌐 Web application: http://localhost:3000"
  echo "📊 MinIO Console: http://localhost:9001 (minioadmin/minioadmin)"
  echo ""
  echo "📝 Default user accounts:"
  echo "  - Admin: admin@example.com / password"
  echo "  - Client: client@example.com / password" 
  echo "  - Editor: editor@example.com / password"
  echo ""
  echo "To stop all services, run: docker compose down"
else
  echo "❌ Failed to start BrandBoost Marketing Website."
  echo "Check the error messages above and try again."
fi 