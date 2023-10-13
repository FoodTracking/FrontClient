FROM node:lts-alpine as dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies node_modules node_modules
RUN npx expo export:web

FROM nginx:stable-alpine as production
COPY --from=builder /app/web-build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]