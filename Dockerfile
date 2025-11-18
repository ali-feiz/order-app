FROM node:22.13.1-alpine3.21
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
COPY dist .
EXPOSE 8080
ENTRYPOINT ["http-server", ".", "-p","8080","--proxy", "http://localhost: 8080?"]