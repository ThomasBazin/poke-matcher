# Use the official Next.js image with Node.js + dependencies preinstalled
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app (default output to .next/)
RUN npm run build

# --- Production image ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only what's needed for production
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

ENV NODE_ENV=production

# Port to expose (Next.js default)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
