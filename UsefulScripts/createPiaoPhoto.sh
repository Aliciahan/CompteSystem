#!/bin/bash
curl -H "Content-Type: application/json" \
-X POST "http://localhost:3000/piao" \
-d '{"idNum":"9326144556","bank":"CCB","type":"dianpiao","amount":"8888","addDate":"1511719888","endDate":"1511719999","setHeaderPhoto":"true"}'
