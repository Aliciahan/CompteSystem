#!/bin/bash

if [[ $(command -v jq) == "" ]]; then
    echo -e "\033[31m Please Install jq in order to run this script. \n\t in Mac : brew install jq \033[0m"
    exit 1
fi

echo -e "\033[33m Get All Piaos \033[0m"
echo -e "\033[32m ----------------------------------------------------------------- \033[0m"

curl "http://localhost:3000/piao" | jq .

echo -e "\033[33m Get the second page with each Page 5 elements \033[0m"
echo -e "\033[32m ----------------------------------------------------------------- \033[0m"

curl "http://localhost:3000/piao?page=2&n=5" | jq .

echo -e "\033[33m Get the second page with each Page 5 elements with order add Date Acsendant \033[0m"
echo -e "\033[32m ----------------------------------------------------------------- \033[0m"

curl "http://localhost:3000/piao?page=2&n=5?order=add-date-ace" | jq .

echo -e "\033[33m Test IdNum Order Search\033[0m"
echo -e "\033[32m ----------------------------------------------------------------- \033[0m"

curl "http://localhost:3000/piao?page=2&n=5&order=idNum-desc" | jq .
curl "http://localhost:3000/piao?page=2&n=5&order=idNum-ace" | jq .
