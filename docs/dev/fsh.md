# FSH - FHIR Short Hand

iHRIS uses fsh syntax for creation of profiles, questionnaires, pages and configurations.
[Here](https://build.fhir.org/ig/HL7/fhir-shorthand/) is a documentation on how to write FSH. After you are done with writting or editing your fsh, you can build them using sushi and then load them into a FHIR server.

If you dont have sushi installed, you may install it with below command

## SUSHI

```bash
sudo npm install -g fsh-sushi
```

## Building fsh with sushi

```bash
cd /var/lib/iHRIS/ihris-backend/your-site-name/ig
sushi . -s
```

Built JSON files are available under /var/lib/iHRIS/ihris-backend/your-site-name/ig/fsh-generated/resources

## Loading built fsh into FHIR server

```bash
cd /var/lib/iHRIS/ihris-backend/your-site-name/ig
node ../../../tools/load.js --server http://localhost:8080/hapi/fhir fsh-generated/resources/*.json
```
