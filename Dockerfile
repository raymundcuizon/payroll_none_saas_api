# syntax=docker/dockerfile:1

FROM node:22.3.0-alpine3.19 AS base

WORKDIR /app

COPY [ "package.json", "package-lock.lock*", "./" ]

FROM base AS dev
ENV NODE_ENV=dev
RUN npm install --force --frozen-lockfile 
COPY . .
CMD [ "npm", "run", "start:dev" ]


FROM base AS prod
ENV NODE_ENV=production
RUN npm install --force --frozen-lockfile --production --omit=dev
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
CMD [ "npm", "run", "start:prod" ]