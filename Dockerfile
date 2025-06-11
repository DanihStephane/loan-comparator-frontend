FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install nodejs and npm
RUN apk add --update nodejs npm

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the Next.js application using a lightweight web server
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Install nodejs and npm in production stage too
RUN apk add --update nodejs npm

# Copy the built files from the previous stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm install --production --only=production

# Expose the port on which the app will run
EXPOSE 3000

CMD ["npm", "run", "dev"]
