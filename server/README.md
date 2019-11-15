This project uses a FHIR compliant server as it's data backend. A sample configuration file can be found in config/config.json.example.

# Config
Copy the config.json.example file to config.json. config.json is not managed by git and will not change if you update to the latest version of iHRIS. The example file has the necessary format and options but will need to be changed to suit your installation.

## Definitions

### Practitioner Page
This is a link to the page definition that will indicate which fields are shown on the add practitioner page.

## Elastic
Elasticsearch is used to power your kibana dashboards. To set up the flow from your FHIR server to an Elasticsearch installation, update these fields to include a link to where your Elasticsearch instance is hosted along with a username and password that will allow iHRIS to update the data in your Elasticsearch instance.

## FHIR
iHRIS uses a FHIR compliant server to manage it's data. Any FHIR compliant server will work but you will need to set one up outside of this application. Once your server has been setup, update the config file to include the link to the server along with a username and password that will allow iHRIS to read/write data to your FHIR server.

## Kibana
Kibana is used to render dashboards on the frontend. The data in your Kibana dashboards will be synced from your FHIR installation to an Elasticsearch installation. To enable dashboards in your application, provide a link to your kibana installation.
