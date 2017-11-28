#!/bin/bash
curl -H "Content-Type: application/json" \
-X POST "http://localhost:3000/piao" \
-d '{"idNum":"93261","bank":"CCB","type":"dianpiao","amount":"5106","addDate":"1511719134","endDate":"1511719999","setHeaderPhoto":"true"}'
