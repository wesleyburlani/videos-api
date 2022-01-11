#!/bin/bash
mongoimport --host mongodb --db videos --collection videos --type json --file /videos.json --jsonArray