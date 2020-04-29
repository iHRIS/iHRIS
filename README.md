
# iHRIS

iHRIS, IntraHealth International's free, open source software, helps countries around the world track and manage their health workforce data to improve access to services. Countries use it to capture and maintain high-quality information for health workforce planning, management, regulation, and training.

iHRIS is built on a flexible framework that allows ministries of health, professional councils, and health service delivery organizations to adapt applications for a wide variety of uses. Developed in collaboration with national stakeholders beginning in 2005, with support from USAID, iHRIS is used in more than 20 countries to manage over a million health worker records at a potential cost savings of over $275 million when compared to commercial software.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For development purposes, we recommend a Linux server with at least the following specs

```
vCPU: 4
Memory: 16gb
Root partition: 8gb
```

You will also need a FHIR compliant server. More information on setting up a FHIR compliant will be outlined in the next section

```
Hapi FHIR
```

iHRIS also makes use of the following open source technologies. More information on installing those will be available in the following section.

```
Elasticsearch
Kibana
```

A web server will be needed to serve the frontend content.

```
nginx
apache
```

### Installing

#### Cloning iHRIS

These instructions will demonstrate how to get iHRIS running in a development environment. First clone the project in your dev environment. 

```
mkdir ihris
cd ihris
git clone https://github.com/iHRIS/iHRIS .
```

#### Node.js

Next set up Node.js. This will also install npm which will be used to install the necessary packages for iHRIS. For simplicity, we recommend installing Node.js using a [package manager](https://nodejs.org/en/download/package-manager/) but you can also install from source. Once you have installed Node.js, verify this by running the following commands and verify that your output is similar.

```
$ node -v
v10.15.3

$ npm -v
6.14.4
```

#### NPM packages

Now install the necessary npm packages that are used by the frontend and the backend. Navigate to the `ui` and `server` directories and install the necessary npm packages.

```
cd /path/to/ihris/ui
npm install

cd /path/to/ihris/server
npm install
```

#### Elasticsearch

Elasticsearch is used for reporting (via Kibana) as well as searching. Follow [these instructions](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html) to set up elasticsearch on your server. Once you have installed elasticsearch, verify that elasticsearch is running by running one of the following commands. If you are using a Linux server and installed elasticsearch using a package manager, you can verify using systemd.

```
sudo systemctl status elasticsearch
```

If you aren't using a Linux server, elasticsearch will be running by default on port 9200. You can see if elasticsearch is running by using a simple curl request.

```
curl -X GET 'http://localhost:9200/_cat/indices?v'
```

#### Kibana

Kibana is used for generating reports. The data needed to generate these reports are stored in elasticsearch. Follow [these instructions](https://www.elastic.co/guide/en/kibana/current/install.html) to set up Kibana on your server. Once you have installed Kibana, verify that Kibana is running by running one of the following commands. If you are using a Linux server and installed Kibana using a package manager, you can verify using systemd.

```
sudo systemctl status kibana
```

By default, Kibana is running on port 5601. If you have configured your webserver to redirect traffic to that port, you can navigate to the url to see if Kibana is running. If not, you can run the following command to see that the page loads.

```
curl -X GET 'http://localhost:5601/status
```

Please note that the output is quite large.

#### FHIR server

The last dependency that needs to be installed is a FHIR server. [Hapi FHIR](https://hapifhir.io/) is a great open source solution and installation instructions can be found below.

[TK]

#### Config files

Once the external dependencies have been installed, you are ready to set up your iHRIS installation. For your convenience, sample configuration files have been provided for both the ui and server components. Run the following commands to create your own version of those configuration files.

```
cd ui
cp src/config/config.json.example src/config/config.json

cd server
cp config/config.json.example config/config.json
```

The details of altering those configuration files can be found on the [ui README](https://github.com/iHRIS/iHRIS/tree/master/ui) and [server README](https://github.com/iHRIS/iHRIS/tree/master/server) respectively.

#### FHIR resources

iHRIS makes use of several custom FHIR resources. For your convenience, default versions are located in the [resources directory](https://github.com/iHRIS/iHRIS/tree/master/resources). Please upload those to your FHIR server. You may alter them to show / hide / add fields as you wish.

[TK]

#### Creating elasticsearch indices

Next we need to create the practitioner index in elasticsearch. This is used for searching as well as the mHero send message page. To create the index, run the following commands.

```
[TK]
```

#### Starting iHRIS

Finally, you are ready to start iHRIS. To start the backend, navigate to the server directory and run the following command.

```
cd server
npm run start
```

This assumes you have already installed the necessary packages as referenced above. To start the frontend, run the following command.

```
cd ui
npm run serve
```

This command allows for hot reloading without having to rebuild the application each time you make a change.

## Docker

The backend and frontend are separate, iHRIS is built with the option to run as a docker swarm.

Clone the repo and set the configs `./config/ui_config.json` and `./config/server_config.json` from the corresponding `./config/*.example`s.

To build the images run the script below (make sure there are no active containers using the images)

``sh docker-build.sh``

Then run the command below which should start ihris as a docker swarm.

``docker stack deploy -c ihris-stack.yml ihris``

This assumes you have swarm mode initialized, if not initialize with

``docker swarm init``

## Running the tests

We are using [jest](https://jestjs.io/) for our automated testing suite. 

### Unit tests

To run the automated tests, use the following command

```
cd ui
npm run test:unit
```

You can also run a specific test by listing the file after that command. For example

```
cd ui
npm run test:unit tests/unit/views/bulkUpload.spec.js
```

### Linter

To ensure new code matches the coding style of the existing software, a linter has been set up to warn and autocorrect files to keep with standards. To run the linter, use the following command

```
cd ui
npm run lint
```

If you would like the linter to automatically correct your files, run the following command

```
cd ui
npm run lint --fix
```

## Deployment

To deploy iHRIS on a production server, follow the same installation instructions above to install the necessary dependencies. The only step that is different is running the frontend code. To run the frontend application, run the following commands.

```
cd ui
npm run build
```

This will compile the frontend code and place it in the `ui/dist` directory. Once that command has finished running, copy the contents of `ui/dist` to wherever your webserver serves content from.

## Built With

* [Node.js](https://nodejs.org/) - Javascript runtime engine
* [Vue.js](https://vuejs.org/) - The web framework used
* [Elasticsearch](https://www.elastic.co/) - Search and analytics engine
* [Kibana](https://www.elastic.co/kibana) - Reporting and visualization software
* [HAPI FHIR](https://hapifhir.io/) - Standard for managing healthcare records
