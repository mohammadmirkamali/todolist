# Step 1. Rebuild the source code only when needed
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]



