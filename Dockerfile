FROM node:latest as build
WORKDIR /app

ARG SENTRY_AUTH_TOKEN
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_SENTRY_DNS
ARG REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID
ARG REACT_APP_GTM_ID
ARG REACT_APP_CLARITY_TOKEN
ARG REACT_APP_GOFTINO_TOKEN

COPY ./package.json ./
RUN npm i --legacy-peer-deps
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build

FROM nginx:latest as production
ENV SERVER_NAME = _
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx
COPY ./nginx.conf.template /etc/nginx/templates/
COPY --from=build /app/build /var/www/public
