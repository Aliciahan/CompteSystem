FROM centos:latest

Label MAINTAINER="xicun.han@gmail.com"

COPY ./scripts/getCsv.py /
COPY ./scripts/check.sh /
COPY ./scripts/start.sh /

RUN yum update -y && yum install -y bash python-dev &&\
        mkdir -p /csvFolder &&\
        mkdir -p /todo &&\
        chmod +x /start.sh &&\
        chmod +x /check.sh


ENTRYPOINT ["/start.sh"]

