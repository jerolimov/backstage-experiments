# [Backstage](https://backstage.io)

This is a sample that uses a local PostgreSql database.

## Start a Postgresql

### With Podman

```sh
podman run --rm -it -p 5432:5432 --env-file .env docker.io/library/postgres:latest
```

### With Podman as Pod

```sh
podman pod create --name postgresql -p 5432:5432
podman run -d --pod=postgresql --name postgres --env-file .env docker.io/library/postgres:latest
```

See status and logs:

```
podman pod stats postgresql
podman pod logs postgresql
```

Cleanup:

```sh
podman pod stop postgresql
podman pod rm postgresql
```

## Start backstage

```sh
yarn install
yarn dev
```
