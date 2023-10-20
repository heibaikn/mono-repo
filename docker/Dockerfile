FROM node:18.16.0 AS builder

WORKDIR /app

# ENV NODE_ENV production

COPY ../ /app

RUN npm install -g pnpm
RUN pnpm i 
RUN pnpm run a:build 


# 阶段 2: 使用 Nginx 作为 Web 服务器
FROM nginx:alpine

# 复制构建好的 Vue 项目文件到 Nginx 的默认 web 目录
COPY --from=builder /app/dist /home/www/dist/

# 复制自定义的 Nginx 配置文件（如果有）
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 Nginx 默认端口
EXPOSE 7002

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]