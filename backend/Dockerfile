# Use slim Node — install Playwright + Chromium + all system deps in one step
FROM node:20-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    wget \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install Chromium and all its OS-level dependencies
RUN npx playwright install --with-deps chromium

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
