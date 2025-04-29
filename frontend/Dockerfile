

FROM node:18
WORKDIR /usr/src/app

COPY  . .
RUN npm install

RUN npm run build
RUN npm install -g serve

EXPOSE 3001

# Command to start the static file server
CMD ["serve", "-s", "build", "-l", "3001"]