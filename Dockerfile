FROM node:latest

WORKDIR /app

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
COPY . /opt/app

RUN "node_modules/@angular/cli/bin/ng" build

EXPOSE 8080

CMD ["node_modules/http-server/bin/http-server", "dist/", "-p", "8080"]