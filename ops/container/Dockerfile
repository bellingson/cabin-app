FROM node:8.9.4

RUN echo "America/New_York" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

RUN groupadd vhost
RUN useradd -s /bin/bash -g vhost vhost

RUN mkdir -p /opt/cabin/app
RUN chown -R vhost:vhost /opt/cabin

COPY dist /opt/cabin/app

USER vhost

WORKDIR /opt/cabin/app
CMD node ./server.js
