# 외부 Docker 환경용 정적 WASA 배포 이미지입니다.
# 사용 예: docker build -f deployment/static/Dockerfile -t wasa-site .
FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_WEB3FORMS_ACCESS_KEY
ENV VITE_WEB3FORMS_ACCESS_KEY=${VITE_WEB3FORMS_ACCESS_KEY}
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
COPY deployment/static/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
