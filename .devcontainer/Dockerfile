FROM node:24.1.0-slim as deps
RUN apt update && apt install python3 build-essential protobuf-compiler -y

WORKDIR /workspace

COPY package*.json ./
COPY lerna*.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY libs ./libs

RUN npm install

FROM deps

# Install git and SSH tools for development
RUN apt update && apt install -y \
    git \
    openssh-client \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy apps for potential building
COPY apps/frontend ./apps/frontend
COPY apps/backend ./apps/backend

# RUN npx lerna run build

# Switch to node user (already exists in Node.js base image)
USER node