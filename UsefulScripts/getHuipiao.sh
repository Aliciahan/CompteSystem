#!/bin/bash

echo -e "\033[33m Get All Piaos \033[0m"
echo -e "\033[32m ----------------------------------------------------------------- \033[0m"

curl "http://localhost:3000/piao"

echo -e "\033[33m Get the second page with each Page 5 elements \033[0m"
echo -e "\033[32m ----------------------------------------------------------------- \033[0m"

curl "http://localhost:3000/piao?page=2&n=5"

echo -e "\033[33m Get the second page with each Page 5 elements with order add Date Descendant \033[0m"
echo -e "\033[32m ----------------------------------------------------------------- \033[0m"

curl "http://localhost:3000/piao?page=2&n=5?order=add-date-desc"


