docker-build:
	docker build -t quay.io/jerolimov/backstage-experiments-theme-tests .

docker-run:
	docker run --rm -it -p 3000:3000 -p 7007:7007 quay.io/jerolimov/backstage-experiments-theme-tests

docker-push:
	docker push quay.io/jerolimov/backstage-experiments-theme-tests

deploy-sandbox:
	oc -n cjerolim-dev new-app --image=quay.io/jerolimov/backstage-experiments-theme-tests

rollout-sandbox:
	oc rollout restart deployment/nginx

deploy: deploy-sandbox

rollout: rollout-sandbox
