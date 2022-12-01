FROM node:18 as build

ENV APP_PATH=/usr/src/app
WORKDIR $APP_PATH
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.17
COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]