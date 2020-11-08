FROM node:latest as build

RUN mkdir -p /usr/src/shifts-ui

WORKDIR /usr/src/shifts-ui

COPY package.json /usr/src/shifts-ui


RUN npm install


COPY . /usr/src/shifts-ui

RUN npm run build


FROM nginx:alpine

COPY --from=build /usr/src/shifts-ui/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
