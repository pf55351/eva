FROM node:18-alpine as eva-backend

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .env .

RUN npm ci install
RUN npm i typescript -g

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN tsc

EXPOSE 9000
CMD [ "node", "dist/server.js" ]