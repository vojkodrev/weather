FROM node:latest

WORKDIR /app

ADD . /app

#RUN ls
RUN npm install
RUN "node_modules/@angular/cli/bin/ng" build

EXPOSE 8080

CMD ["node_modules/http-server/bin/http-server", "dist/", "-p", "8080"]