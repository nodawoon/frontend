FROM node:20.15-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build

RUN npm run start

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html
