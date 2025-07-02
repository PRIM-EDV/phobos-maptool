FROM node:24.1.0-slim as deps
RUN apt update && apt install python3 build-essential protobuf-compiler git openssh-client ca-certificates sudo -y

# Add node user to sudo group and allow passwordless sudo
RUN usermod -aG sudo node && echo "node ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

WORKDIR /workspace

COPY package*.json ./
COPY lerna*.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY libs ./libs

RUN npm install

# Ensure the node user owns the workspace directory
RUN chown -R node:node /workspace

# FROM deps
# COPY apps/frontend ./apps/frontend
# COPY apps/backend ./apps/backend

# RUN npx lerna run build