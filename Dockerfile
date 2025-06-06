FROM node:24.1.0-slim AS deps
RUN apt update && apt install python3 build-essential protobuf-compiler -y

WORKDIR /opt/phobos-maptool

COPY package*.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY libs ./libs

RUN npm install

FROM deps AS libs

RUN npm run build:core
RUN npm run build:models
RUN npm run build:protocol
RUN npm run build:dto
RUN npm run build:elements
RUN npm run build:map

# Build webapp
FROM libs AS frontend

COPY apps/frontend ./apps/frontend
RUN npm run build:frontend

# Build backend
FROM libs AS backend

COPY ./apps/backend ./apps/backend
RUN npm run build:backend

# Final image
FROM backend

WORKDIR /opt/phobos-maptool
COPY --from=frontend /opt/phobos-maptool/frontend/dist/phobos-maptool/browser ./dist/public

# Run startscript
COPY ./docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]