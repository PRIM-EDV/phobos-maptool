# ----------------------
# Base dependencies layer
# ----------------------
FROM node:24.1.0-slim AS deps
RUN apt update && apt install python3 build-essential protobuf-compiler -y

WORKDIR /opt/phobos-maptool

# Copy root lerna workspace files
COPY package*.json ./
COPY lerna*.json ./

# Copy workspace app' package.json files
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Copy all libraries
COPY libs ./libs

RUN npm install

# ----------------------
# Frontend build
# ----------------------
FROM deps AS frontend
COPY apps/frontend ./apps/frontend
RUN npx lerna run build --scope @phobos-maptool/frontend --include-dependencies

# ----------------------
# Backend build
# ----------------------
FROM deps AS backend
COPY apps/backend ./apps/backend
RUN npx lerna run build --scope @phobos-maptool/backend --include-dependencies

# ----------------------
# Image
# ----------------------
FROM backend

WORKDIR /opt/phobos-maptool
COPY --from=frontend /opt/phobos-maptool/apps/frontend/dist/phobos-maptool/browser ./apps/backend/public

# Run startscript
COPY ./docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]