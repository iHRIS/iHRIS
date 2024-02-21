#!/usr/bin/env bash
set -ex

# this only works for vagrant ubuntu instances (localhost)
# --forks 1 to stop hosts checking on first run: https://github.com/ansible/ansible/issues/25068
ansible-playbook prep.yaml --connection=local
ansible-playbook postgresinstall.yaml --connection=local
ansible-playbook tomcat.yaml --connection=local
ansible-playbook maven.yaml --connection=local
ansible-playbook hapi.yaml --connection=local
ansible-playbook gofr.yaml --connection=local
