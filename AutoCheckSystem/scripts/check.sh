#!/bin/bash

usage() {
    cat <<-EOF
            Usage: /check.sh [-f] <CIBLE> [-c] <CIBLE> [-h]

            This program is written checking the availablilty of Cheng Dui Hui Piao


            OPTIONS:
            ========
                    -f    Indicating the file Name
                    -c    Indicate the serial number
                    -h    Affiche ce message

            EXAMPLES:
            =========


EOF
        }

function check() {
    A=$(curl -s -X GET http://www.piaojubao.com/risk/search.shtml?keyword="$1"\
    --user-agent "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101" \
    | grep 无风险)

    if [[ ! $A == "" ]]; then
        echo yes
    else
        echo no
    fi
}

function checkCode() {
    B=$(check "$1")
    if [[ $B == "yes"  ]]; then
        echo -e "\033[32m [Done] No.${1} \033[0m There is no error report for this HuiPiao"
    else
        echo -e "\033[31m [Attention] No.${1} \033[0m This Hui Piao Might be risky, please check http://www.piaojubao.com/risk/search.shtml?keyword=${1} for details"
    fi
}

function checkFile() {
    for code in $(cat "$1"); do
        checkCode "$code"
        sleep 3
    done
}

while getopts "f:c:h" arg
do
    case $arg in
    f)
        checkFile "$OPTARG"
        ;;
    c)
        checkCode "$OPTARG"
        sleep 3
        ;;
    h)
        usage
        exit 0
        ;;
        ?)
        echo -e "\\033[31m Unknow argument \\033[0m"
        exit 1
        ;;
    esac
done

shift $((OPTIND-1))

case $1 in
#    aaaa)
#    shift 1
#    ccRunServices "$@"
#    ;;
    "")
    exit 0
    ;;
    *)
    echo -e "\\033[31m Error \\033[0m No Such Option" 1>&2
    exit 1
    ;;
esac
