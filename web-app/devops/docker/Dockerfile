### STAGE 1: Build ###
FROM node as build
ARG ENVIRONMENT=prod

WORKDIR /usr/src/app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build:$ENVIRONMENT
RUN rm -rf node_modules/

### STAGE 2: Run ###
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./devops/config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/web-app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
