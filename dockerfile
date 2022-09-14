FROM node:14-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci && npm install
#add ignore view and node_modules
COPY . .

COPY ./bin ./bin

CMD ["npm", "run", "start:dev"]