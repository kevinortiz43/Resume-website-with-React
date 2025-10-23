# FROM node:22-slim AS base

# ARG PORT=3000

# ENV NEXT_TELEMETRY_DISABLED=1

# WORKDIR /app

# FROM base AS dependencies 

# COPY package.json package-lock.json ./

# RUN npm ci 



# FROM base AS build

# COPY --from=dependencies /app/node_modules ./node_modules
# COPY . .



# RUN npm run build

# FROM base AS run

# ENV NODE_ENV=development
# ENV PORT=$PORT

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=build /app/public ./public
# COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE $PORT

# ENV HOSTNAME="0.0.0.0"
# CMD ["node", "server.js"]


# FROM node:22-slim AS base

# ARG PORT=3000

# ENV NEXT_TELEMETRY_DISABLED=1

# WORKDIR /app

# # Depency stage
# FROM base AS dependencies 

# COPY package.json package-lock.json ./

# RUN npm ci --only=production && \
#     npm cache clean --force

# # Build stage
# FROM base AS build

# COPY --from=dependencies /app/node_modules ./node_modules
# COPY . .

# # Install dev dependencies for build
# RUN npm ci

# RUN npm run build

# # Production runtime stage
# FROM base AS run

# ENV NODE_ENV=production
# ENV PORT=$PORT

# # Create non-root user
# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 nextjs

# # Set correct permissions
# RUN mkdir -p .next && \
#     chown -R nextjs:nodejs .next

# # Copy built assets
# COPY --from=build --chown=nextjs:nodejs /app/public ./public
# COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE $PORT

# ENV HOSTNAME="0.0.0.0"

# CMD ["node", "server.js"]

FROM node:22-slim AS base
WORKDIR /app
COPY package*.json ./


FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build


FROM base AS production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# CMD npm start
CMD ["npm","start"]

FROM base AS dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
# CMD npm run dev
CMD ["npm","run","dev"]
