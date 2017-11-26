#!/bin/bash

curl -X PUT "http://localhost:3000/piao/5a1af2c9b047ea511545065c" \
    -H "Content-Type: application/json" \
    -d '{ "_id": "5a1af2c9b047ea511545065c", "idNum": "8982", "bank": "LCF", "type": "dianpiao","amount": 18681,"endDate": "1970-01-18T11:55:15.944Z","__v": 0,"addDate": "1970-01-18T11:55:15.527Z"}'
