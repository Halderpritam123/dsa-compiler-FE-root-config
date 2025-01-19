# Use a Node.js image for the build stage
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the webpack-dev-server
EXPOSE 9000

# Start webpack dev server
CMD ["npm", "run", "start"]
