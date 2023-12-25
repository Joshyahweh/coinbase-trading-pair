# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# 


# Download yarn package

RUN npm install -g npm@10.2.5

# Install application dependencies
RUN yarn

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8081

# Define the command to run your application
CMD ["yarn", "dev"]
