FROM centos:7

RUN  \
yum install -y iproute net-tools; \
# Install jq
curl -o /usr/local/bin/jq -L https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64; \
chmod +x /usr/local/bin/jq; \
# Delete cache files.
yum clean all;