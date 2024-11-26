# 빌드 이미지 단계
FROM node:20 AS build

WORKDIR /app

# 패키지 파일과 환경 변수 파일 복사
COPY package*.json ./
COPY .env ./.env

RUN npm ci

# 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# 런타임 이미지 단계
FROM node:20-alpine

WORKDIR /app

# 빌드된 결과물 복사
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
COPY --from=build /app/node_modules /app/node_modules

# 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "run", "start"]
