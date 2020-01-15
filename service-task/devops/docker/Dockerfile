FROM node:12.14.1
MAINTAINER Vitalii Boiko

ARG DB_URL
ARG INTERNAL_USER=agranom
ARG INTERNAL_PASSWORD

ENV WORK_DIR /opt/app
ENV DB_URL=$DB_URL
ENV INTERNAL_USER=$INTERNAL_USER
ENV INTERNAL_PASSWORD=$INTERNAL_PASSWORD

ADD ./src $WORK_DIR/src
ADD ./devops $WORK_DIR/devops
ADD ./public $WORK_DIR/public
ADD ./package.json $WORK_DIR
ADD ./webpack.config.js $WORK_DIR

WORKDIR $WORK_DIR
RUN npm i
RUN npm run build:prod
RUN rm -rf node_modules/ src/ devops/

EXPOSE 3000

CMD ["node", "/opt/app/dist/bundle.js"]
