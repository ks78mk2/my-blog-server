FROM node:14-alpine

RUN mkdir -p /server
WORKDIR /server
ADD . /server
RUN npm install
EXPOSE 9090

# CMD ["pm2-docker", "test.js"]
CMD ["npm", "start"]