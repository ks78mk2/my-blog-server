FROM node:12.2.0-alpine

RUN mkdir -p /server
WORKDIR /server
ADD . /server
RUN npm install
EXPOSE 9090

# CMD ["pm2-docker", "test.js"]
CMD ["npm", "start"]