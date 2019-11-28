FROM node:10.15.1

WORKDIR /opt/iHRIS/ui
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "serve"]