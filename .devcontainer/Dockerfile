FROM node:24.1.0-slim AS deps

# Install necessary packages for development and git operations
RUN apt update && apt install -y \
    python3 \
    build-essential \
    protobuf-compiler \
    git \
    openssh-client \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Create a non-root user for development
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# Set up SSH directory for the node user
RUN mkdir -p /home/node/.ssh && \
    chown -R node:node /home/node/.ssh && \
    chmod 700 /home/node/.ssh

# Copy package files and install dependencies
COPY package*.json ./
COPY lerna*.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY libs ./libs

RUN npm install

# Set proper ownership of the workspace
RUN chown -R node:node /workspace

# Switch to non-root user
USER node

# Set up git configuration for the container
RUN git config --global --add safe.directory /workspace && \
    git config --global init.defaultBranch main && \
    git config --global core.autocrlf input