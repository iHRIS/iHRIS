# Installing iHRIS Manually

This was done on a clean Ubuntu 20.04 server.

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

## SUSHI

```bash
sudo npm install -g fsh-sushi
```

## OpenSearch and OpenSearch-dashboard

### OpenSearch

<https://opensearch.org/docs/latest/install-and-configure/install-opensearch/debian/>

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

Install opensearch-dashboard only if you will be using opensearch dashboards.

<https://opensearch.org/docs/latest/dashboards/install/tar/>

For OpenSearch-dashboards make sure you edit ```/path/to/opensearch-dashboards-2.3.0/config/opensearch_dashboards.yml``` and set ```server.basePath``` and ```server.rewriteBasePath```

```yaml
server.basePath: "/dashboards"

server.rewriteBasePath: true
```

!!! Note
    There is also a docker installation here <https://opensearch.org/docs/latest/opensearch/install/docker/>

## Tomcat

Add an APT repository that has Tomcat9 if using Ubuntu 24.04 or newer, otherwise, skip this step.

```bash
sudo add-apt-repository -y -s "deb http://archive.ubuntu.com/ubuntu/ jammy main universe"
```

### Install Tomcat9

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

### Clone Repository

It is recommended to install iHRIS under /var/lib for linux/mac users just for standardization purpose, but iHRIS can be installed on any directory.

```bash
cd /var/lib
sudo git clone https://github.com/iHRIS/iHRIS.git
```

### Install dependencies

```bash
cd /var/lib/iHRIS/ihris-backend
sudo npm install
cd /var/lib/iHRIS/ihris-frontend
sudo npm install
```

### Create your backend site

```bash
cd /var/lib/iHRIS/ihris-backend
sudo cp -r ihris-backend-site your-site-name
```

Change **your-site-name** to the name of your preference, it is recommended your-site-name to be on the directory /var/lib/iHRIS/ihris-backend so that you can easily reuse iHRIS npm packages. This site will be used to run the iHRIS backend and customizing iHRIS backend based with your needs. Customization is covered on a separate section.
If you already have your-site-name on github, clone it instead of copying ihris-backend-site

### Create configuration file

iHRIS comes with default configuration file that you can copy and customize based on your needs, run below commands to copy the default configuration.

```bash
cd your-site-name
cp config/baseConfig.json.example config/baseConfig.json
```

Now you may open config/baseConfig.json and change configurations based on your setup

the main variables to look out for are the

```bash
"fhir:base"
"app:core:path"
"app:site:path"
"elasticsearch:base"
```

### Install dependencies for your site

This assumes that you are still inside your-site-name directory

```bash
sudo npm install
```

### Create your frontend site

This is only needed if you intend to customize the frontend by adding new components

```bash
cd /var/lib/iHRIS/ihris-frontend
sudo cp -r src/ihris-frontend-site site
```

For now the name of the frontend site **must** be **site** and **must** be located inside the directory /var/lib/iHRIS/ihris-frontend

### Install dependencies for tools

```bash
cd /var/lib/iHRIS/tools
sudo npm install
```

#### Start the IHRIS System

iHRIS is divided into two components, the frontend and the backend. To build the
frontend, go to /var/lib/iHRIS/ihris-frontend and run `npm run build` then copy built files into /var/lib/iHRIS/ihris-backend/your-site-name/public.
The backend can be started as below

For production

```bash
cd /var/lib/iHRIS/ihris-backend/your-site-name
npm run start
```

For development

```bash
cd /var/lib/iHRIS/ihris-backend/your-site-name
npm run dev
```

System can now be accessed [here](http://localhost:3000)

**This marks the end of the IHRIS System installation.**

## Loading Resources

When you start iHRIS for the first time, it will load the default customization that is located on your site under ig/fsh-generated/resources. In case these default customizations were not loaded, run below command to load them

```bash
cd /var/lib/iHRIS/ihris-backend/your-site-name/ig
node ../../../tools/load.js --server http://localhost:8080/hapi/fhir fsh-generated/resources/*.json
```
