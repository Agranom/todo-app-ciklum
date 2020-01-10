ARG SVC_AUTH_HOST_URL=http://localhost:3001
ARG SVC_TASK_HOST_URL=http://localhost:3000

### STAGE 1: Build ###
FROM node as build

ENV SERVICE_AUTH_HOST_URL=$SVC_AUTH_HOST_URL
ENV SERVICE_TASK_HOST_URL=$SVC_TASK_HOST_URL

WORKDIR /usr/src/app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build:prod
RUN rm -rf node_modules/

### STAGE 2: Run ###
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./devops/config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/web-app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
