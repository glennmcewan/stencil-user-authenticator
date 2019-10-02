ARG NODE_ENV=development

#Builder stage
FROM node:10-alpine as builder
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm install

# Test stage
FROM node:10-alpine as test
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

CMD ["npm", "test"]

# Final stage/image
FROM node:10-alpine
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

CMD ["npm", "start"]
