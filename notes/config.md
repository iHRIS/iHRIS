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

## Config options

### Allowed in local config
* fhir:server (default: http://localhost:8080/hapi/fhir/)
* fhir:username
* fhir:password
* security:disabled (when set to true the no signature checks are done on remote config or modules)
* config
 * name = id of config Parameters resource
* keys
 * name = public key string

### Allowed in local or remote
* user:loggedout = id of logged out user resource (default: ihris-user-loggedout)
* auth:google:clientId
* auth:google:clientSecret
* modules (These are for express endpoint modules)
 * [name] = id of Library resource
* site
 * title = "title" (default: Manage)
 * site = "site" 
 * logo = "logo image" (default: iHRIS5Logo.png)
 * auth - List of authorization options 
  * [name] = The name of the config (e.g. google or local)
   * type = post | get (how the authorization is submitted, with post will create a pop up form)
   * link = link to get or post
   * btn
    * image = image for the button
    * text = Alt text for the button
 * footer
  * links
   * [name] = The name of the link (e.g. about or ihris)
    * text = Text to display
    * to = vue route (e.g. /static/page-about
    * href = external link
* shortname
 * [Resource]
  * fhirpath (single fhirpath for displaying for this resource)
  * format (string for util.format())
  * order = "[field],[field]" (comma delimited list of named paths)
  * paths
   * [field]
    * fhirpath
    * join (string to join on, default: " ")
* workflow
 * processor
  * [name] = id of Library resource
 * questionnaire
  * [name]
   * url = canonical URL of the questionnaire
   * processor = [processor] (name of the processor)


# Resources used for configuration
## Page resource

*work in progress*

The page resource can have search fields to display, filters available, the structure definition, 
and the display order of fields.  Complex field order can be changed within the complex field, but 
not across the whole resource.  E.g. name.use, name.family, name.given, but you can't add gender 
between name.use and name.family.

* filter can include the label in the value.  include any modifier as well.  These must be the
FHIR search parameters available for the resource.
 * Name|name:contains
