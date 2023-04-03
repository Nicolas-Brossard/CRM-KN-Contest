#!/bin/bash

ENDPOINT="http://localhost:3000/api/contact/create"

declare -a types=("Clients" "Leads" "Prospects")

for t in "${types[@]}"; do
  for i in {1..8}; do
    lower_t=$(echo "$t" | tr '[:upper:]' '[:lower:]')
    curl -X POST "$ENDPOINT" \
      -H "Content-Type: application/json" \
      -d "{
        \"user_id\": 2,
        \"type\": \"$t\",
        \"first_name\": \"${t}_First_$i\",
        \"last_name\": \"${t}_Last_$i\",
        \"email\": \"${lower_t}_$i@example.com\",
        \"phone\": \"123-456-78${i}\",
        \"location\": \"Nantes\",
        \"company\": \"Example Inc.\",
        \"position\": \"Developer\",
        \"status\": \"Active\"
      }"
  done
done
