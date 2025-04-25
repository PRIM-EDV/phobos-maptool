FROM node:23.11.0-slim AS frontend
RUN apt update && apt install protobuf-compiler -y 

WORKDIR /opt/phobos-maptool/frontend

# Install webapp source dependancies
COPY ./frontend/*.json ./
RUN npm install

# Build webapp
COPY ./frontend/src ./src
COPY ./frontend/lib ./lib
# COPY ./protocol ../protocol

# RUN npm run proto:generate
RUN npm run build

FROM node:23.11.0-slim AS backend
RUN apt update && apt install protobuf-compiler -y 

WORKDIR /opt/phobos-maptool/backend

# Install server source dependancies
COPY ./backend/*.json ./
RUN npm install

# Build server
COPY ./backend/src ./src
COPY ./backend/lib ./lib 
# COPY ./protocol ../protocol

# RUN npm run proto:generate
RUN npm run build

# Get webapp artifact
COPY --from=frontend /opt/auth/frontend/dist/phobos-maptool/browser ./public

#
EXPOSE 3100
EXPOSE 3200

# Run startscript
COPY ./docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]