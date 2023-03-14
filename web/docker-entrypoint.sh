#! /bin/sh

envsubst '$$APPLICATION_HOST' \
  < /home/nginx/nginx.conf \
  > /etc/nginx/nginx.conf

exec "$@"