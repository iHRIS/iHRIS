# Installation Of Supporting software
This was done on a clean Ubuntu 20.4 server.

## Node JS LTS
```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install -g npm
```
### On ARM
On ARM64 machines there is an issues with installing the canvas node module. Run the following commands or there equivalent in MacOSX
```
sudo apt install pkg-config
sudo apt install libpixman-1-dev libcairo2-dev libpango1.0-dev libjpeg8-dev libgif-dev
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
!!! This must be secured or people will be able to do bad things.
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
Edit ```pom.xml``` and change the following line from hapi-fhir-jpaserver or ROOT (starting with version 5.1.0):
```xml
    <finalName>hapi</finalName>
```
!!! The most recently tested hapi version for iHRIS is 6.1.0
#### For versions starting with 5.7.0 to the latest
Edit ```src/main/resources/application.yaml``` and update the following values as bellow:
```
spring:
  datasource:
    url: 'jdbc:postgresql://localhost:5432/hapi'
    username: hapi
    password: PASS
    driveClassName: org.postgresql.Driver
  jpa:
    properties:
      hibernate.dialect: ca.uhn.fhir.jpa.model.dialect.HapiFhirPostgres94Dialect
      hibernate.search.enabled: true
      hibernate.search.backend.type: lucene
      hibernate.search.backend.analysis.configurer: ca.uhn.fhir.jpa.search.HapiHSearchAnalysisConfigurers$HapiLuceneAnalysisConfigurer
      hibernate.search.backend.directory.type: local-filesystem
      hibernate.search.backend.directory.root: target/lucenefiles
      hibernate.search.backend.lucene_version: lucene_current
hapi:
  fhir:
    fhir_version: R4
    enable_index_missing_fields: true
    tester:
       home:
        name: iHRIS
        server_address: http://localhost:8080/hapi/fhir/
        refuse_to_fetch_third_party_urls: false
        fhir_version: R4
```

#### For versions starting with 5.2.0
Things were streamlined a bit so the values to edit are simpler.
Edit ```src/main/resources/application.yaml``` and update the following values:

```
spring:
  datasource:
    url: 'jdbc:postgresql://localhost:5432/hapi'
    username: hapi
    password: PASS
    driveClassName: org.postgresql.Driver
  jpa:
    properties:
        hibernate.search.enabled: true

hapi:
  fhir:
    fhir_version: R4
    enable_index_missing_fields: true
    tester:
       home:
        name: iHRIS
        server_address: http://localhost:8080/hapi/fhir/
        refuse_to_fetch_third_party_urls: false
        fhir_version: R4
```

#### For versions starting with 5.1.0 
Edit ```src/main/resources/application.yaml``` and update the following values:

```
spring:
  datasource:
    url: 'jdbc:postgresql://localhost:5432/hapi'
    username: hapi
    password: PASS
    driveClassName: org.postgresql.Driver
  jpa:
    properties:
      hibernate.dialect: org.hibernate.dialect.PostgreSQL95Dialect
      hibernate.search.default.indexBase=/var/lib/tomcat9/target/lucenefiles
hapi:
  fhir:
    tester:
      id: home
      name: iHRIS
      server_address: http://localhost:8080/hapi/fhir/
      refuse_to_fetch_third_party_urls: false
      fhir_version: R4
```

#### Create war file

```bash
sudo apt install default-jdk
mvn clean install -DskipTests
sudo mkdir -p /var/lib/tomcat9/target/lucenefiles
sudo chown -R tomcat:tomcat /var/lib/tomcat9/target
sudo cp target/hapi.war /var/lib/tomcat9/webapps
```

#### Set paths in startup file
Edit ```/etc/systemd/system/multi-user.target.wants/tomcat9.service```

In the security section add the following directory with a ReadWritePath

```bash
ReadWritePaths=/var/lib/tomcat9/target/
```
#### Access Hapi-fhir server
Test the [hapi-fhir server](http://localhost:8080/hapi) to make sure it's running

```bash
http://localhost:8080/hapi
```
## Installation of IHRIS

#### Create the IHRIS site file in the ihris-backend directory

```bash
cd (your Path to iHRIS)/iHRIS/ihris-backend
cp -r ihris-backend-site site
```

#### Configure the IHRIS site

copy from existing example file.

```bash
cd ihris-backend/site
cp config/baseConfig.json.example config/baseConfig.json
```

Update the configurations based on your setings by editing the baseConfig.json file.
the main variables to look out for are the

```bash
"fhir:base"
"app:core:path"
"app:site:path"
"elasticsearch:base"
```

#### Start the IHRIS System

Install ihris-backend Packages

```bash
cd (your Path to iHRIS)/iHRIS/ihris-backen/
npm install
```

Install site Packages
```bash
cd site
npm install
```

While in Site path run

for production
```bash
npm run start
```

for Development
```bash
npm run dev
```
System can now be accessed [here](http://localhost:3000)

**This marks the end of the IHRIS System installation.**


# Other usefull things to know about the IHRIS System

## SUSHI
```bash
sudo npm install -g fsh-sushi
```

You can make customizations for your own configurations in the ig/ 
directory.  To get the default data, you can compile the FSH files with:
```bash
cd ig/
sushi -s .
```

Any time you make changes to the FSH files you should rebuild them 
this way.  The FSH files are in ig/input/fsh/.

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

After building the FSH files, you can import them with the following:
```bash
node load.js --server http://localhost:8080/hapi/fhir ../ig/fsh-generated/resources/*.json
```

Then to load the starter resources run the command bellow
```bash
node load.js --server http://localhost:8080/hapi/fhir ../resources/*.json
```

## OpenSearch and OpenSearch-dashboard

Ubuntu install instructions:

### OpenSearch
https://opensearch.org/docs/latest/install-and-configure/install-opensearch/debian/

Import the public GPG key. This key is used to verify that the APT repository is signed.

```bash
 curl -o- https://artifacts.opensearch.org/publickeys/opensearch.pgp | sudo apt-key add -
```

Create an APT repository for OpenSearch:

```bash
echo "deb https://artifacts.opensearch.org/releases/bundle/opensearch/2.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/opensearch-2.x.list
```

Verify that the repository was created successfully.

```bash
 sudo apt-get update
```

With the repository information added, list all available versions of OpenSearch:

```bash
sudo apt list -a opensearch
```

Choose the version of OpenSearch you want to install:
Unless otherwise indicated, the latest available version of OpenSearch is installed.

```bash
sudo apt-get install opensearch
```

During installation, the installer will present you with the GPG key fingerprint. Verify that the information matches the following:

```bash
Fingerprint: c5b7 4989 65ef d1c2 924b a9d5 39d3 1987 9310 d3fc
```

Once complete, enable OpenSearch.

```bash
 sudo systemctl enable opensearch
```

Start OpenSearch.

```bash
 sudo systemctl start opensearch
```

Verify that OpenSearch launched correctly.

```bash
 sudo systemctl status opensearch
 ```

### OpenSearch-dashboards
https://opensearch.org/docs/latest/dashboards/install/tar/

For OpenSearch-dashboards make sure you edit ```/path/to/opensearch-dashboards-2.3.0/config/opensearch_dashboards.yml``` and set ```server.basePath``` and ```server.rewriteBasePath```

```yaml
server.basePath: "/dashboards"

server.rewriteBasePath: true
```
!!! Note
    There is also a docker installation here https://opensearch.org/docs/latest/opensearch/install/docker/
