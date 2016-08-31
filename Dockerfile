FROM node:4.5.0
MAINTAINER James Ribar <james@jribar.com>
ENV HTTP_PROXY http://web-proxy.jpn.hp.com:8080
ENV HTTPS_PROXY http://web-proxy.jpn.hp.com:8080
ENV http_proxy http://web-proxy.jpn.hp.com:8080
ENV https_proxy http://web-proxy.jpn.hp.com:8080
ENV EXPRESS_PORT 3000
RUN mkdir /tmp/phantomjs \
    && curl -L https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 \
           | tar -xj --strip-components=1 -C /tmp/phantomjs \
    && mv /tmp/phantomjs/bin/phantomjs /usr/bin \
    && rm -rf /tmp/phantomjs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm","start"]
