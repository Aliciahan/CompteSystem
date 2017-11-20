#!/usr/bin/env python
#-*- coding: utf-8 -*-

import csv
import sys


if __name__ == "__main__":

    f = open ('/todo/'+sys.argv[1]+'.huipiaoji', 'w')

    with open('/csvFolder/'+sys.argv[1], 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        for i in range(0, int(sys.argv[2])):
            header = next(reader)
        for row in reader:
            if row[int(sys.argv[3])-1]:
                f.write(row[int(sys.argv[3])-1]+'\n')
    f.close()
