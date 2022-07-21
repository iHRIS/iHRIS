# Getting Started with Docker

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

## Launch HAPI

If there isn't a HAPI server running, one can be brought up using the HAPI docker-compose file. This instance also includes a Postgres database.

```sh
docker-compose -f docker-compose.hapi.yml up -d
# the -d backgrounds the server stdout
```

## Upload Core Structure Definitions from HL7

The core structure definitions must be loaded into HAPI. If using an existing HAPI instance, this is still required.

```
docker-compose -f docker-compose.hapi.config.yml up
```

!!! note
    You must -- whether with an existing HAPI server or the one you just launched -- upload structure definitions. This is done with the HAPI FHIR cli (which actually launches another instance of HAPI then shuts down). This config must be run but only needs to be run once.


You should see the stdout when running this. It will take ~5 minutes depending on your network latency.

To run against a different HAPI FHIR server, the image can be run to target a different address:
```
docker run --env IHRIS_FHIR__BASE=http://localhost:8080/fhir ihris/upload-definitions:latest
```

```log
# example output
upload    | 2020-10-19 16:08:23.233 [main] INFO  c.u.f.c.ValidationDataUploader Uploading ValueSet 540/1167 : ValueSet/property-representation (1510 bytes}
upload    | 2020-10-19 16:08:23.251 [main] INFO  c.u.f.c.ValidationDataUploader   - Got ID: http://fhir:8080/fhir/ValueSet/property-representation/_history/1
# the process should exit with 0
upload    | 2020-10-19 16:09:46.619 [main] INFO  ca.uhn.fhir.cli.App HAPI FHIR is shutting down...
upload exited with code 0
```

## Upload Customized iHRIS Definitions

iHRIS customizations are written as structure definitions. There is a core set of structure definitions in the iHRIS repository. These must be loaded into HAPI (in addition to the base uploaded above). You can either customize and upload your own iHRIS definitions, or for evaluation and demo purposes use a provided image.

To use the existing structure definitions:
```
docker-compose -f docker-compose.ihris.config.yml up
```

To run against a different HAPI FHIR server, the image can be run to target a different address:
```
docker run --env IHRIS_FHIR__BASE=http://localhost:8080/fhir ihris/ihris-config:latest
```

## Load Demo Data

iHRIS does not come loaded with demo data. If there is a need to load fake data for evaluation and demo, there is an existing container to do so.
```
docker-compose -f docker-compose.ihris.data.yml up -d
```

## Launch ElasticSearch and Kibana

You may already have ElasticSearch and Kibana running. They are required for functionality. If not, run the following:

```sh
docker-compose -f docker-compose.elastic.yml up -d
```


## Launch Redis and iHRIS


```
docker-compose -f docker-compose.ihris.yml up -d
```

Now open [http://localhost:3000](http://localhost:3000) and log in using username: admin@ihris.org and password: ihris

There will be no dashboards by default.

Enjoy!

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
