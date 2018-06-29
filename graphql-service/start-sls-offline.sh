#!/bin/bash

echo $1
sls offline start --skipCacheInvalidation --stage ${1}
