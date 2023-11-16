FROM node:lts-alpine as dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as dev
WORKDIR /app
COPY . .
COPY --from=dependencies node_modules node_modules
CMD ["npx", "expo", "start", "--port=80"]

