FROM node:10

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 9090

# CMD ["pm2-docker", "test.js"]
CMD ["npm", "start"]