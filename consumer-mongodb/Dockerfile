FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash git curl

RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc 

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

USER node

WORKDIR /home/node/consumer-mongodb
