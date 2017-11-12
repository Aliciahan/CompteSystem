#!/bin/bash

curl -X POST "http://localhost:3000/users" \
    -H "Content-Type: application/json" \
    -d '{"username":"user007","password":"3u-lW_T%qZr!/;U%","email":"user@domain.com"}'

