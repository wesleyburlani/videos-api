#!/bin/bash

mongoimport --host mongodb --db videos --collection users --type json --file /users.json --jsonArray
mongoimport --host mongodb --db videos --collection videos --type json --file /videos.json --jsonArray