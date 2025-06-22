FROM node:24.1.0-slim AS deps
RUN apt update && apt install python3 build-essential protobuf-compiler -y

WORKDIR /opt/phobos-maptool

COPY package*.json ./
COPY lerna*.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY libs ./libs

RUN npm install

# Build frontend
FROM deps AS frontend

COPY apps/frontend ./apps/frontend
RUN npx lerna run build --scope @phobos-maptool/frontend --include-dependencies

# Build backend
FROM deps AS backend

COPY apps/backend ./apps/backend
RUN npx lerna run build --scope @phobos-maptool/backend --include-dependencies

# Final image
FROM backend

WORKDIR /opt/phobos-maptool
COPY --from=frontend /opt/phobos-maptool/apps/frontend/dist/phobos-maptool/browser ./apps/backend/public

# Run startscript
COPY ./docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]