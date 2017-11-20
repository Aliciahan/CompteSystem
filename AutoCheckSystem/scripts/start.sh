#!/bin/bash

function checkfiles() {

for file in $(ls /csvFolder)
do
    echo -e "--- Treating cvs file: \033[33m $file \033[0m with Header Column $1: where id found in $2 th col"
    python /getCsv.py "$file" "$1" "$2"
    /check.sh -f "/todo/$file.huipiaoji"
done

echo -e "\033[33m [All Done] \033[0m Thanks for using."

}

while getopts "h" arg
do
    case $arg in
        # a)
        # $OPTARG
        # ;;
        h)
        usageRun
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
    code)
    shift 1
    /check.sh -c "$@"
    ;;
    files)
    shift 1
    checkfiles "$@"
        ;;
    "")
    exit 0
    ;;
    *)
    echo -e "\\033[31m Error \\033[0m No Such Option" 1>&2
    exit 1
    ;;
esac
