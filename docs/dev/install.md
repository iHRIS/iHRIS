# Installation
This was done on a clean Ubuntu 20.4 server.

## Node JS LTS
```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g npm
```
## Redis
**This must be secured or people will be able to do bad things.**
```bash
sudo apt install redis
```
## Tomcat
```bash
sudo apt install tomcat9
```
## PostgreSQL
**This must be secured or people will be able to do bad things.**
```bash
sudo apt install postgresql
```
## HAPI FHIR
**This must be secured or people will be able to do bad things.**
### Create Database and User
```bash
sudo -u postgres psql
create database hapi;
create user hapi with encrypted password 'PASS';
grant all privileges on database hapi to hapi;
\q
```
### Install Maven
```bash
sudo apt install maven
```
### Compile HAPI
```bash
git clone https://github.com/hapifhir/hapi-fhir-jpaserver-starter.git
cd hapi-fhir-jpaserver-starter
```
Edit ```pom.xml``` and change the following line from hapi-fhir-jpaserver:
```xml
    <finalName>hapi</finalName>
```
Edit ```src/main/resources/hapi.properties``` and set the following:
```
server_address=http://localhost:8080/hapi/fhir/

datasource.driver=org.postgresql.Driver
datasource.url=jdbc:postgresql://localhost:5432/hapi
datasource.username=hapi
datasource.password=PASS

hibernate.dialect=org.hibernate.dialect.PostgreSQL95Dialect

hibernate.search.default.indexBase=/var/lib/tomcat9/webapps/hapi/target/lucenefiles
```
Create war file
```bash
mvn clean install -DskipTests
sudo mkdir /var/lib/tomcat9/target
sudo chown tomcat:tomcat /var/lib/tomcat9/target
sudo cp target/hapi.war /var/lib/tomcat9/webapps
```

#### Load basic definitions
Download and install hapi-fhir-cli:
https://hapifhir.io/hapi-fhir/docs/tools/hapi_fhir_cli.html
```bash
./hapi-fhir-cli upload-definitions -v r4 -t http://localhost:8080/hapi/fhir/
```

## SUSHI
```bash
sudo npm install -g fsh-sushi
```

You can make customizations for your own configurations in the fsh/ 
directory.  To get the default data, you can compile the FSH files with:
```bash
cd fsh/
sushi -s .
```

Any time you make changes to the FSH files you should rebuild them 
this way.

## Loading Resources

There is a script in the tools/ directory to load some sample configuration
files as well as the FHIR resources created by SUSHI.  The first time
you will need to run npm install:

```bash
cd tools/
npm install
```

**All the following commands should be run from the tools/ directory, 
replacing the server with the correct location for your installation.**

After that, you can use the load.js script to load FHIR resources into
your FHIR server with:
```bash
node load.js --server http://localhost:8080/hapi/fhir PATH/TO/FHIR.json
```

To load the starter resources, you should start with:
```bash
node load.js --server http://localhost:8080/hapi/fhir ../resources/*.json
```

After building the FSH files, you can import them with the following:
```bash
node load.js --server http://localhost:8080/hapi/fhir ../fsh/build/input/{profiles,extensions,examples,resources,vocabulary}/*.json
```

## ElasticSearch

Ubuntu install instructions:
https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html

Make sure to install ElasticSearch and Kibana:
```bash
sudo apt install elasticsearch kibana
```

After installing, edit /etc/kibana/kibana.yml and set server.basePath
```yaml
server.basePath: "/kibana"
```

# Back end server

## Before starting

You'll need to run npm install when additional node modules are installed or updated
and also before starting the first time.

```bash
cd ihris-backend/
npm install
```

## Development mode
Run the following to start the server in development mode.
```bash
cd ihris-backend/
npm run dev
```
## Production mode
Run the following to start the server in production mode.
```bash
cd ihris-backend/
npm run start

TODO: Convert this to a systemd script for startup and shutdown

# Front end Development

Built with vue cli 4.4.1
```bash
sudo npm install -g @vue/cli
```


## To run in development mode

You may need to edit the proxy settings in ihris-frontend/vue.config.js
depending on where you started the backend.


```bash
cd ihris-frontend/
npm run serve
```

The output will give you a URL to access the frontend.

## Production

The frontend will be built and saved to the backend server public 
files (ihris-backend/public/) to be served or you can run them from any 
static web server.

```bash
cd ihris-frontend/
npm run build
```

The files in ihris-frontend/dist/ can be served statically from your
web server.  Releases will be compiled to the ihris-backend/public/
directory so you will only need to do this if you want to make changes
to the frontend software.
