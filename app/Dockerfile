FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install 
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "./bin/www"]