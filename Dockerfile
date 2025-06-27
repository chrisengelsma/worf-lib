###############
# BUILD STAGE #
###############

FROM node:20-alpine AS build-stage

RUN apk add --no-cache tini

# Update npm and global packages
RUN npm install -g npm@latest
RUN npm update -g

# Common Environment Variables
# NB: Setting NODE_ENV to production will cause npm to ignore dev dependencies
ENV NODE_ENV=production
ENV LOG_LEVEL=debug
ENV PORT=8080
ENV TSC_COMPILE_ON_ERROR=true

WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install -g typescript@5.4.4

COPY . .

RUN npm run build

#############
# RUN STAGE #
#############

# Copy compiled code and serve using nginx.

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]