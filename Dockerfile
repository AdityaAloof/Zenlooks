# Use an official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies for the project
RUN npm install

# Copy all other project files to the container
COPY . .

# Build the React app for production
RUN npm run build

# Install a lightweight web server to serve the React app
RUN npm install -g serve

# Set the command to start the web server and serve the production build
CMD ["serve", "-s", "build"]

# Expose port 3000 to access the app
EXPOSE 3000
