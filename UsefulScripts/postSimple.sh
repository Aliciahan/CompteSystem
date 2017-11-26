#!/bin/bash


function addOnePiao() {
    a=$RANDOM
    if [[ $((a%3)) == 0 ]]; then
        bank_name="ICBC"
        piao_type="dianpiao"
    elif [[ $((a%3)) == 1 ]]; then
        bank_name="CCB"
        piao_type="dianpiao"
    else
        bank_name="BNP"
        piao_type="guogu"
    fi
    Message={\"idNum\":\"$RANDOM\",\"bank\":\"$bank_name\",\"type\":\"$piao_type\",\"amount\":\"$RANDOM\",\"addDate\":\"$(date +%s)\",\"endDate\":\"$(($(date +%s)+$RANDOM))\"}
    echo $Message

    sleep 2
    curl -H "Content-Type: application/json" -X POST "http://localhost:3000/piao" -d $Message
}

rangei=0
rangen=140
while [[ "$rangei" -lt $rangen ]]; do
    addOnePiao
    rangei="$(($rangei+1))"
done
