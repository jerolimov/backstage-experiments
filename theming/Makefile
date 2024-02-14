host-build:
	yarn install --frozen-lockfile
	yarn tsc
	yarn build:backend --config ../../app-config.yaml
	docker image build . -f packages/backend/Dockerfile --tag quay.io/jerolimov/backstage-experiments:theming

run:
	docker run --rm -it -p 3000:3000 quay.io/jerolimov/backstage-experiments:theming

push:
	docker push quay.io/jerolimov/backstage-experiments:theming

deploy:
	oc create deployment theming --image=quay.io/jerolimov/backstage-experiments@sha256:27bed0346a6ba9c3a90c1852330cee41bbba77e37030d4f41712a184e3307c88 --port=3000
	oc expose deployment theming
	oc create route edge theming --service=theming
