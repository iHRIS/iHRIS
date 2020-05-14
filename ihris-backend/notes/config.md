# Configuration options
Configuration will have base information in config/baseConfig.js.
This should only need to have the FHIR server information and the 
public keys that are accepted by this server.

Configuration names should all be lower case to allow
for overriding from the ENV.
```javascript
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "fhir:server",
      "valueString": "http://localhost:8080/hapi/fhir/"
    },
    {
      "name": "keys",
      "part": [
        {
          "name": "ihris",
          "valueString": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdeFrJr76IQ+SYAoAIw8crZKNW\nir2re7Z7Iu+XzeYYop5+36Ux6uEQKSXo7s1xY2ou9nCkVAddZ1qehBo0e2MCtk62\nmQJbBT18fiZ3veQPvb0LC/9aFl64RuOguPrCZC+sbZLegQ6Wwf96UWyqmR49gaHO\nEdXwdFdSVyBGyS7dmwIDAQAB\n-----END PUBLIC KEY-----"
        }
      ]
    }
  ]
}
```
## Additional configuration
Additional configuration details should be loaded from signed
Parameters on the FHIR server.

Any config can also be set from the command line when starting
or from the ENV.  ENV variables to be loaded must start with IHRIS\_
which will be stripped off. \_\_ is used as a separator in environment
variables.

Command line:
```
--fhir:server http://locahost:8080/hapi/fhir
```

Environment:
```
IHRIS_FHIR__SERVER=http://locahost:8080/hapi/fhir
```
