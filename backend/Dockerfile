# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Expose the port your Express app runs on
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]