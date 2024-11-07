# Dockerfile
# 빌드 결과물을 저장할 이미지 단계
# 빌드 이미지 단계
FROM node:20 AS build

WORKDIR /app

# 패키지 파일과 환경 변수 파일 복사
COPY package*.json ./
COPY .env ./.env

RUN npm ci

# 소스 코드 복사
# Next.js 애플리케이션 빌드
RUN npm run build

# 최종 런타임 단계
# 런타임 이미지 단계
FROM node:20-alpine

WORKDIR /app
