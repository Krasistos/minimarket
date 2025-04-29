
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

RUN apk add --no-cache bash openssl
RUN npm install prisma --save-dev

COPY . .

RUN npm install
RUN npm run build

RUN npx prisma generate
EXPOSE 3000
# Start the backend application in production mode
CMD ["npm", "run", "start:prod"]