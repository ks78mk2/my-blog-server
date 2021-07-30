FROM node:14-alpine

RUN mkdir -p /app
RUN mkdir -p /app/node_modules
WORKDIR /app
ADD . /app
RUN npm run build
EXPOSE 9090

# CMD ["pm2-docker", "test.js"]
CMD ["npm", "start"]