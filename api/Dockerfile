FROM node:18
ENV APP_PATH=/usr/src/app
WORKDIR $APP_PATH
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD [ "node", "dist/main.js" ]