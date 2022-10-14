FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package.json /app-frontend/

RUN npm install

COPY . /app-frontend/

EXPOSE 3000

CMD [ "npm", "start" ]