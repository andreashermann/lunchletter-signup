#!/bin/bash
grunt --force
docker build -t lunchletter/signup .
