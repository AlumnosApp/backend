FROM node:12
WORKDIR /home/node/app
COPY ./backend/package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]