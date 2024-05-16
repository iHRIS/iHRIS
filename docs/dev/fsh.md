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

## iHRIS Configuration

iHRIS has several configurations and all these configurations can either be defined inside config/baseConfig.json or ig/input/fsh/IhrisParameters.fsh example of configurations includes system menus (vavigation), Questionnaire workflows, fields and page configurations etc.
IhrisParameters.fsh has a key or signature which is generated from all the configuration it has. Changing any of the configuration will make the key invalid and it will require the key to be generated. To generate a new key after changing the configuration, you first need to build the fsh into json and then sign the json file as in below

```bash
cd /var/lib/iHRIS/ihris-backend/your-site-name/ig
node ../../../tools/signConfig.js --key ../../../tools/rsa_1024_priv.pem --config fsh-generated/resources/Parameters-ihris-config.json
```

This will generate a configuration that is signed i.e with a new key, You may save the output into a file and load it into the FHIR server. Also you will need to replace the old key inside IhrisParameters.fsh with the new key available under parameter[0].valueSignature.data. This will help you not to re-sign the configuration everytime it is to be loaded into a FHIR server. Also the easy way to save the signed output is by directing the output into a file as in below

```bash
cd /var/lib/iHRIS/ihris-backend/your-site-name/ig
node ../../../tools/signConfig.js --key ../../../tools/rsa_1024_priv.pem --config fsh-generated/resources/Parameters-ihris-config.json > ~/signed.json
```

That will save signed content into your home directory inside a file signed.json
