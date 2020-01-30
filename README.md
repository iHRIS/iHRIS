# iHRIS
## Installation
iHRIS is built with a VueJS frontend and a NodeJS backend, both of which are included in this repository. To install, simply run `git clone git@github.com:iHRIS/iHRIS.git`.

From there, you will need to install the necessary npm packages. Navigate to the ui directory and run `npm install`. Now, do the same for the server directory.

Both the ui and server components make use of config files. Both of these config files can be found under `config/` and include an example config file for your convenience. Copy the sample to `config/config.json` for both ui and server and edit them as needed.

The server component relies on the presence of a fhir compliant server. The login credentials can be placed inside the config.json file for the server component.

## Running iHRIS
iHRIS is divided into two components, the ui frontend and a backend. To start the ui frontend, run `npm run serve`. To start the backend, run `npm run start`.

## Running iHRIS in a Docker Container
You can find instructions how to install docker here [Docker Engine Installation](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-engine---community-1)

Instructions how to run the `ui` and the `backend` are in the respective directories.

=======
## What do I need?
In order to run iHRIS, you will need a FHIR compatible server (such as hapi), an elasticsearch instance, kibana, and nginx to run kibana. Please refer those installation documents for guidance. You will also need nodejs and npm to install packages and run the backend server. 

## Structure Definitions
iHRIS is powered by a FHIR compliant server. This allows the user to tailor their installation by changing the structure definitions to show/hide different components, add custom extensions, and rename sections. We have provided several custom structure defintions insides the resources/StructureDefintion directory. Load those to your FHIR compatible server.

## Authentication
iHRIS includes basic username / password authentication for all pages other than the dashboard. A sample user can be found under resources/demos/admin.iHRISUser.json. The username and password for this user is admin / admin. It is STRONGLY recommended that the password be changed on installation.

## Running iHRIS as a Docker Swarm.
The backend and frontend are separate, iHRIS is built with the option to run as a docker swarm.

After cloning, run the command below which should start a swarm `ihris`.

``docker stack deploy -c ihris-stack.yml ihris``

This assumes you have swarm mode initialized, if not initialize with

``docker swarm init``
