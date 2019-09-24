FROM node:10 as builder

WORKDIR /var/www

# Copy onle package.json for cache npm install
COPY package.json .

# Setup
RUN npm i npm@latest -g
RUN npm install


ENV PUBLIC_URL ./
COPY . .
RUN npm run build


FROM nginx:alpine

# Make ports available to the world outside this container
EXPOSE 8080
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=builder /var/www/build /var/www

CMD ["nginx", "-g", "daemon off;"]