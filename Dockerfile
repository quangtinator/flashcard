FROM node:18.12.1

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "build" ]