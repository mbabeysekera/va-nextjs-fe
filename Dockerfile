# Stage 1: Install dependencies
FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the app
FROM node:16-alpine AS builder
WORKDIR /app

# Accept Build Arguments
ARG BACKEND_URL
ARG API_BASE_URL
ARG CDN_URL
ARG CDN_KEY

# Set them as ENV so the 'npm run build' process can see them
ENV BACKEND_URL=$BACKEND_URL
ENV API_BASE_URL=$API_BASE_URL
ENV CDN_URL=$CDN_URL
ENV CDN_KEY=$CDN_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]