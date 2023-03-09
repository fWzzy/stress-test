FROM node:18 AS development

WORKDIR /app

ENV NODE_ENV=development
# RUN npm config set registry http://registry.npmjs.org/ --global

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:debug"]

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN yarn global add pm2

COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist/* .

CMD ["pm2-runtime", "main.js"]