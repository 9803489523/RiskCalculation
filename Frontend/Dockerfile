FROM node:18.17.1

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}

COPY . ${APP_ROOT}

RUN yarn install && yarn build

EXPOSE 3000

CMD "yarn","preview"]
