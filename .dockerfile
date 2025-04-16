# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

COPY package*.json .

# Copy all files from the current directory to /app in the container
COPY . .

ENV PORT=5000
ENV JWT_SECRET_KEY = 1cd250e3d95814b1787995da00f5459d420ffd1fba108397bd92aa92666269e2
ENV DB_URI = "mongodb+srv://meetvaghani211:ajZzIG6xS7zbCSG4@cluster0.ptrfukw.mongodb.net/square_users?retryWrites=true&w=majority&appName=Cluster0"


# Install dependencies
RUN npm install

# Expose the port your app will run on
EXPOSE 5000

# Define the command to run your app
CMD ["npm", "start"]
