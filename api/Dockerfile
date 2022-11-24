FROM node:18

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]