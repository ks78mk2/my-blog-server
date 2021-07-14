FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# RUN npm install pm2 -g

COPY . .

EXPOSE 9090

# CMD ["pm2-docker", "test.js"]
CMD ["npm", "start"]