# Getting Started with Docker

!!! note "Time to complete: 20 minutes"
    iHRIS is built upon FHIR structure definitions. On a freshly installed HAPI FHIR Server, the definitions must be loaded. This can take up to 5 minutes. Customizations and the standard catalog of definitions from the iHRIS repository are also loaded.
    

# 


## Development and Troubleshooting





```
docker run --rm -it --network ihris_default $(docker build -q -f Dockerfile.upload.definitions .)
```
This uses the helpful hint from [here](https://stackoverflow.com/questions/45141402/build-and-run-dockerfile-with-one-command) to build and run an image then delete it.