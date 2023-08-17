# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle app source
COPY . .

# The app listens on port 3000, so expose this port
EXPOSE 3000

# Define the command to run the app
CMD npm run build && npm start
