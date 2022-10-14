FROM node:16.14-alpine

WORKDIR /app-backend

COPY package.json /app-backend/

RUN npm install

COPY . /app-backend/

EXPOSE 3001

CMD ["npm", "run", "dev"]