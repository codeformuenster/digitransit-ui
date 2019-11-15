FROM node:10

WORKDIR /opt/digitransit-ui
ADD . ./

ENV \
  # Where the app is built and run inside the docker fs \
  WORK=/opt/digitransit-ui \
  # Used indirectly for saving npm logs etc. \
  HOME=/opt/digitransit-ui

RUN \
  yarn install --silent && \
  yarn add --force node-sass && \
  yarn run build && \
  rm -rf static docs test /tmp/* && \
  yarn cache clean

ENV \
  # App specific settings to override when the image is run \
  SENTRY_DSN='' \
  SENTRY_SECRET_DSN='' \
  PORT=8080 \
  API_URL='' \
  MAP_URL='' \
  OTP_URL='' \
  GEOCODING_BASE_URL='' \
  APP_PATH='' \
  CONFIG='' \
  NODE_ENV='production' \
  NODE_OPTS='' \
  RELAY_FETCH_TIMEOUT='' \
  ASSET_URL='' \
  STATIC_MESSAGE_URL=''

EXPOSE 8080
# CMD ["/usr/local/bin/node", "server/server"]

CMD yarn run start
# ps -ef
#   /bin/sh -c yarn run start
#   node /opt/yarn-v1.19.1/bin/yarn.js run start
#   /bin/sh -c NODE_ENV=production node $NODE_OPTS server/server
#   /usr/local/bin/node server/server
