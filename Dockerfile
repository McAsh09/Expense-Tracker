# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# This is done separately to leverage Docker's layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Serve the built application using a lightweight web server like serve
# Install serve globally in the container
RUN npm install -g serve

# Expose the port the app will run on (default for serve is 3000)
EXPOSE 3000

# Command to run the application when the container starts
# Serve the build directory
CMD [ "serve", "-s", "build" ]
