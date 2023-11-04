FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY . /usr/src/app

CMD ["npm","start"]