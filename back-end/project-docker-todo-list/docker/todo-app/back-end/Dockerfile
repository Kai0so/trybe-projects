FROM node:14-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

ADD node_modules.tar.gz ./

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
