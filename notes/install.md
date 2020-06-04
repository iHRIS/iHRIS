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
sudo npm install -g fsh-sushi@beta
```


# Front end Development

Built with vue cli 4.4.1
```bash
sudo npm install -g @vue/cli
```
