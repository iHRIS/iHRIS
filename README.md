# iHRIS ![docs](https://github.com/iHRIS/iHRIS/workflows/docs/badge.svg)

Technical documentation has been started and is hosted at: [https://iHRIS.github.io/iHRIS](https://iHRIS.github.io/iHRIS)

## Installation

See the notes/ directory for additional installation instructions for development.  
Installation instructions for supporting software is [here](notes/install.md).
A docker version for simpler installation will be created soon.

iHRIS is built with a VueJS frontend and a NodeJS backend, both of which are included 
in this repository. To install, simply run 
`git clone git@github.com:iHRIS/iHRIS.git`.

From there, you will need to install the necessary npm packages. Navigate to the 
ihris-frontend directory and run `npm install`. Now, do the same for the ihris-backend 
directory.


The backend component relies on the presence of a fhir compliant server. 
The login credentials can be placed inside the config/baseConfig.json file for 
the backend component.

## Running iHRIS
iHRIS is divided into two components, the ui frontend and a backend. To build the 
ui frontend, run `npm run build`. To start the backend, run `npm run start`.

