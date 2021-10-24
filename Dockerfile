FROM node:14.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "npm", "start" ]
