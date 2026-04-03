# Use the official Playwright image — includes Chromium + all system deps
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

# Install Node dependencies first (layer cache)
COPY package*.json ./
RUN npm ci

# Install Chromium for playwright-extra (on top of the base image)
RUN npx playwright install chromium

# Copy source
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
