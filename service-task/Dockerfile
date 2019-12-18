FROM node
MAINTAINER Vitalii Boiko

ENV WORK_DIR /opt/app

ADD ./src $WORK_DIR/src
ADD ./package.json $WORK_DIR
ADD ./webpack.config.js $WORK_DIR

WORKDIR $WORK_DIR
RUN npm i
RUN npm run build:prod
RUN rm -rf node_modules/ src/

CMD ["node", "/opt/app/dist/bundle.js"]
