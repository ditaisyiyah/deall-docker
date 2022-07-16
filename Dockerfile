FROM node:16

# Create app directory
WORKDIR /deall

# Install app dependencies
COPY package*.json /deall

RUN npm install

# Bundle app source
COPY . /deall

ENV PORT 3000

CMD [ "node", "app.js" ]
