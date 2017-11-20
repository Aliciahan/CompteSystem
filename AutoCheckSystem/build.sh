#!/bin/bash

docker build -t huipiaocheck . &&\
docker tag huipiaocheck aliciahan/huipiaocheck:latest &&\
docker push aliciahan/huipiaocheck:latest

