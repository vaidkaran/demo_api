#!/bin/sh

serviceId="srv-cqfmnjtds78s73c1adng"
apiKey="rnd_omRr9p8zxtfAUB5ssad9ac6qvmFw"

echo "triggering the deloyment"

depId=$(curl -s --request POST \
  --url https://api.render.com/v1/services/$serviceId/deploys \
  --header "accept: application/json" \
  --header 'content-type: application/json' \
  --header "Authorization: Bearer $apiKey" \
  | jq -r ".id")

echo "Deployment complete with id: $depId"

function depStatus() {
  ds=$(curl -s --request GET \
  --url https://api.render.com/v1/services/$serviceId/deploys/$depId \
  --header 'accept: application/json' \
  --header "Authorization: Bearer $apiKey" \
  | jq -r ".status")
  echo $ds
}


echo "Waiting for the deployment to complete. Max wait time: 3 mins"
maxRetries=90
liveStatus=0
i=1
echo "value of i is: $i"
echo "value of maxRetries is: $maxRetries"
while [[ $i -le $maxRetries ]]
do
  echo "inside until............................"
  s=$(depStatus)
  echo "deloyment status is $s"
  if [[ "$s" = "live" ]]
    then
      liveStatus=1
      break
  fi
  echo "Retrying($i) for the deployment to complete in render"
  sleep 2
  i=$((i+1))
done


if [[ $liveStatus -eq 1 ]]
then
  echo "deployment successfully completed with live status"
  exit 0
else
  echo "deployment did not complete with live status in 3 mins"
  exit 1
fi
