# iHRIS
## Installation
iHRIS is built with a VueJS frontend and a NodeJS backend, both of which are included in this repository. To install, simply run `git clone git@github.com:iHRIS/iHRIS.git`.

From there, you will need to install the necessary npm packages. Navigate to the ui directory and run `npm install`. Now, do the same for the server directory.

Both the ui and server components make use of config files. Both of these config files can be found under `config/` and include an example config file for your convenience. Copy the sample to `config/config.json` for both ui and server and edit them as needed.

The server component relies on the presence of a fhir compliant server. The login credentials can be placed inside the config.json file for the server component.

## Running iHRIS
iHRIS is divided into two components, the ui frontend and a backend. To start the ui frontend, run `npm run serve`. To start the backend, run `npm run start`.
