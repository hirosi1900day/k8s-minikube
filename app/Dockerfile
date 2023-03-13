FROM node:10-alpine

COPY . /home/node/webapp

RUN cd /home/node/webapp; \
    mv docker-entrypoint.sh /usr/local/bin; \
    chmod +x /usr/local/bin/docker-entrypoint.sh; \
    yarn install;

EXPOSE 3000

WORKDIR /home/node/webapp
ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD [ "npm", "start" ]