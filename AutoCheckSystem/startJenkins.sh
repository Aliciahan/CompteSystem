#!/bin/bash

docker run --name myjenkins -p 8080:8080 -p 50000:50000 -v /jenkins_home:/var/jenkins_home jenkins
