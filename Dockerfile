FROM mhart/alpine-node:latest

COPY . /home/abvet/

WORKDIR /home/abvet

RUN npm install

CMD ["node", "bin/www"]