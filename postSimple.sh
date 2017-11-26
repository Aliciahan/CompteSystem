#!/bin/bash

curl -H "Content-Type: application/json" -X POST "http://localhost:3000/piao" -d '{"idNum":"1234568","bank":"ICBC"}'
