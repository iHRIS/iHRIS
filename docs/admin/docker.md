# Running iHRIS with Docker

!!! note
    Time to complete: 20 minutes

## Requirements

The Docker approach requires Docker for Mac, Linux, or Windows. On Linux, docker-compose must also be installed.

Memory dedicated to Docker should be increased to 4GB or more. This is a snapshot of memory usage with demo records and no dashboards. iHRIS, Redis, and Postgres use very minimal RAM, compared to Kibana (552MiB), ElasticSearch (846MiB), and HAPI FHIR Server (821MiB).

```
$ docker stats --no-stream
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT  
e70fb8fa618b        ihris               0.00%               66.21MiB / 3.848GiB
8c97df1a9977        ihris_redis_1       0.18%               2.156MiB / 3.848GiB
6899574ca46f        kibana              1.00%               552.5MiB / 3.848GiB
e0a178ab8a1f        es                  2.17%               846.8MiB / 3.848GiB
19cd64447c41        fhir                1.19%               821.4MiB / 3.848GiB
8c1f348e9e3e        ihris_db_1          0.20%               54.07MiB / 3.848GiB
```

## Clone the Repository

Clone the repository and change to the root of it.

```sh
git clone https://github.com/iHRIS/iHRIS.git
# or for advanced users who may want to contribute later
# git clone git@github.com:iHRIS/iHRIS.git
cd iHRIS
```

## Launch iHRIS

iHRIS and all it's supporting software, mentioned above, can be launched by using one docker-compose file. This should run everything you need without running any further commands

```sh
docker-compose up -d
# the -d backgrounds the server stdout
```

!!! note
    The command above, good internet and some patience is all you need to run iHRIS.

Now open [http://localhost:3000](http://localhost:3000) and log in using username: <admin@ihris.org> and password: ihris

There will be no dashboards by default.

Enjoy!

## Installation of IHRIS
Create the IHRIS site file in the ihris-backend directory

```cd into (your Path to iHRIS)/iHRIS/ihris-backend```

Copy over the demo backend site into your ihris-backend. Feel free to name however you like

```cp -r ihris-backend-site site```

## Configure the IHRIS site 

Copy from existing example file.

```cd ihris-backend/site```

```cp config/baseConfig.json.example config/baseConfig.json```

Update the configurations based on your setings by editing the baseConfig.json file. the main variables to look out for are the

"fhir:base"
"app:core:path"
"app:site:path"
"elasticsearch:base"

## Start the IHRIS System

Install ihris-backend Packages

```cd (your Path to iHRIS)/iHRIS/ihris-backend/```

```npm install```

## Install site Packages

```cd site```

```npm install```

While in Site path run:
for production

```npm run start```

for Development

```npm run dev```

## Troubleshooting Notes

Ensure that /resources are loaded, check the logs:

```log
ihris     | [winston] Attempt to write logs with no transports {"message":"Loading Autoload resource directory: ../resources","level":"info"}
ihris     | [winston] Attempt to write logs with no transports {"message":"Saving Basic - ihris-page-practitioner","level":"info"}
ihris     | [winston] Attempt to write logs with no transports {"message":"Saving Basic - ihris-role-admin","level":"info"}
ihris     | [winston] Attempt to write logs with no transports {"message":"Saving Basic - ihris-role-open","level":"info"}
ihris     | [winston] Attempt to write logs with no transports {"message":"Saving Basic - staff","level":"info"}
```

How to build a container locally and immediately remove it. For example:

```
docker run --rm -it --network ihris_default $(docker build -q -f Dockerfile.upload.definitions .)
```

This uses the helpful hint from [here](https://stackoverflow.com/questions/45141402/build-and-run-dockerfile-with-one-command) to build and run an image then delete it.
