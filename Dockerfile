FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm run build
EXPOSE 9090

# CMD ["pm2-docker", "test.js"]
CMD ["npm", "start"]