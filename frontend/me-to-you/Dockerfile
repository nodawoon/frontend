FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json

CMD ["npm", "run", "start"]
