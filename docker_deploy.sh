#!/bin/bash
set -x
docker stop signup-prod 
docker rm signup-prod 
docker run -d --name signup-prod -e NODE_ENV=production -e IP=0.0.0.0 -p 80:8080 lunchletter/signup