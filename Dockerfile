FROM node:0.10
COPY dist/package.json /opt/lunchletter-signup/
WORKDIR /opt/lunchletter-signup
RUN npm install -d --production && npm install -d connect-livereload
COPY dist /opt/lunchletter-signup/
CMD npm start
EXPOSE 8080
