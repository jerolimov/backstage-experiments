#!/bin/bash

set -e

#
# Configuration
#
outFolder="catalog"
orgCount=${1:-1000}
entityCount=${1:-1000}
templateCount=${1:-1000}

#
# Cleanup
#
rm -rf "$outFolder"
mkdir "$outFolder"

#
# Users and groups
#
echo "Create $orgCount orgs (users and groups) in $outFolder/orgs.yaml"
mkdir -p "$outFolder/org"

cat <<EOF > "catalog/orgs.yaml"
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: org
  description: A collection of all orgs
spec:
  targets:
EOF

for i in $(seq 1 $orgCount); do
    cat "examples/org.yaml" \
      | sed "s/guests/guests-$i/g;s/guest$/guest-$i/g" \
      > "catalog/org/org-$i.yaml"
    echo "    - ./org/org-$i.yaml" >> "catalog/orgs.yaml"
done

#
# Entities
#
echo "Create $entityCount entities in $outFolder/entities.yaml"
mkdir -p "$outFolder/entities"

cat <<EOF > "catalog/entities.yaml"
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: entities
  description: A collection of all entities
spec:
  targets:
EOF

for i in $(seq 1 $entityCount); do
    cat "examples/entities.yaml" \
      | sed -e "s/^  name:.*/\0-$i/g" \
      | sed -e "s/^  system:.*/\0-$i/g" \
      | sed -e "s/^  owner:.*/\0-$i/g" \
      | sed "s/providesApis: \[example-grpc-api\]/providesApis: [example-grpc-api-$i]/g" \
      > "catalog/entities/entity-$i.yaml"
    echo "    - ./entities/entity-$i.yaml" >> "catalog/entities.yaml"
done

#
# Templates
#
echo "Create $templateCount templates in $outFolder/templates.yaml"
mkdir -p "$outFolder/templates"

cat <<EOF > "catalog/templates.yaml"
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: templates
  description: A collection of all templates
spec:
  targets:
EOF

for i in $(seq 1 $templateCount); do
    cat "examples/template/template.yaml" \
      | sed -e "s/^  name:.*/\0-$i/g" \
      | sed -e "s/^  title:.*/\0-$i/g" \
      | sed -e "s/^  owner:.*/\0-$i/g" \
      | sed 's,content$,../../examples/template/content,g' \
      > "catalog/templates/template-$i.yaml"
    echo "    - ./templates/template-$i.yaml" >> "catalog/templates.yaml"
done
