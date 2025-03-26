FROM node:18-alpine

# Install needed packages and OpenSSL for Prisma
RUN apk add --no-cache ffmpeg openssl

WORKDIR /app

# Copy package files
COPY clyc-platform/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY clyc-platform/ .

# Generate Prisma client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"] 