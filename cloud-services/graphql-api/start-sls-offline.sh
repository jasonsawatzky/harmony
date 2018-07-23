#!/bin/bash
if [ "$#" == "1" ]
then
  echo $1
  sls offline start --skipCacheInvalidation --stage ${1}

else
  echo "You must specify a configuration (stage)"
fi
