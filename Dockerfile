# Stage 1: Build the React application
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . ./

# Build the app
RUN npm run build

# Show the build directory for debugging
RUN ls -la

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy built assets from the build stage
# For Vite projects, the default output directory is "dist"
COPY --from=build /app/dist /usr/share/nginx/html

# Add your custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]