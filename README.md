# iHRIS ![docs](https://github.com/iHRIS/iHRIS/workflows/docs/badge.svg) ![docker](https://github.com/iHRIS/iHRIS/workflows/docker/badge.svg) ![docker-fsh](https://github.com/iHRIS/iHRIS/workflows/docker-fsh/badge.svg)

Technical documentation has been started and is hosted at: [https://iHRIS.github.io/iHRIS](https://iHRIS.github.io/iHRIS)

## Installation
Follow instructions in here to install dependents
See the notes/ directory for additional installation instructions for development.  
Installation instructions for supporting software is [here](docs/admin/install.md).
A docker version for simpler installation will be created soon.

iHRIS is built with a VueJS frontend and a NodeJS backend, both of which are included 
in this repository.

If you are done installing supporting softwares as in [here](docs/admin/install.md), then follow below steps to setup iHRIS

### Clone Repository
It is recommended to install iHRIS under /var/lib for linux/mac users just for standardization purpose, but iHRIS can be installed on any directory.
```bash
cd /var/lib
git clone https://github.com/iHRIS/iHRIS.git
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
sudo cp -r ihris-backend-site your_site_name
```
Change **your_site_name** to the name of your preference, it is recommended your_site_name to be on the directory /var/lib/iHRIS/ihris-backend so that you can easily reuse iHRIS npm packages. This site will be used to run the iHRIS backend and customizing iHRIS backend based with your needs. Customization is covered on a separate section.
If you already have your_site_name on github, clone it instead of copying ihris-backend-site

### Create configuration file
iHRIS comes with default configuration file that you can copy and customize based on your needs, run below commands to copy the default configuration.
```bash
cd your_site_name
cp config/baseConfig.json.example config/baseConfig.json
```
Now you may open config/baseConfig.json and change configurations based on your setup, espeially the hapi fhir server base url (fhir:base), path to your iHRIS site (app:site:path) and path to your iHRIS Core (app:core:path)

### Create your frontend site
This is only needed if you intend to customize the frontend by adding new components
```bash
cd /var/lib/iHRIS/ihris-frontend
sudo cp -r src/ihris-frontend-site site
```
For now the name of the frontend site is **must** be **site** and **must** be located inside the directory /var/lib/iHRIS/ihris-frontend

The backend component relies on the presence of a fhir compliant server. 
The login credentials can be placed inside the config/baseConfig.json file for 
the backend component.

## Running iHRIS
iHRIS is divided into two components, the ui frontend and a backend. To build the 
ui frontend, go to /var/lib/iHRIS/ihris-frontend and run `npm run build` then copy built files into /var/lib/iHRIS/ihris-backend/your_site_name/public.
The backend can be started as below
```bash
cd /var/lib/iHRIS/ihris-backend/your_site_name
npm run start
```

