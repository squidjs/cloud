FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN node ace build --production
ENTRYPOINT ["node", "build/server.js"]
