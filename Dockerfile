FROM node:14-alpine

WORKDIR /app
# RUN npm install
COPY package*.json ./
RUN npm install  --silent

COPY . .
# RUN npm run build
EXPOSE 9090

# CMD ["pm2-docker", "test.js"]
CMD ["npm", "start"]
