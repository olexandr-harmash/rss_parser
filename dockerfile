FROM node:14-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

COPY ./bin ./bin

CMD ["npm", "run", "start:dev"]