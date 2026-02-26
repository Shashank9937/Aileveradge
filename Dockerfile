FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and run the Vite build
COPY . .
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine

# Copy the built Vite application (index.html)
COPY --from=builder /app/dist /usr/share/nginx/html

# Also copy the standalone anti-gravity page so it is accessible at /anti-gravity.html
COPY anti-gravity.html /usr/share/nginx/html/anti-gravity.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
