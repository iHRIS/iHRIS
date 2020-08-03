# ihris-backend

## Configuration

### Create Structure definitions for resources.

This project uses a FHIR compliant server as it's data backend. You will need to load the structure definitions for all the needed resources.  While in the `fsh` folder run the command bellow to create the FHIR Implementation Guide
```
sushi -s .
```
### Load the FHIR Server

There is a tool to load the the necessary reources to the fhir server. While in the `tools` folder. Use the `load.js` file to load the files in `fsh/build/input` folder. The files to load can be found in.
    - profiles
    - extensions
    - vocabulary
    - examples
    - resources

i.e to load files in the `profiles` folder
```
node load.js --server url-of-fhir-server ../fsh/build/input/profiles/*
```
You will also need to load the files in the `project-folder/resources`

## Project setup
```
npm install -g
```

### Start for development
```
npm start
```

### Run for production

#### ihris service file

If you are running iHRIS on a Linux server, we recommend using systemd to manage the backend server.
Here is an example of the service file.
```
[Unit]
Description=iHRIS Backend
After=network.target

[Service]
WorkingDirectory=/opt/www/ihris/ihris-backend
ExecStart=/usr/bin/npm run start

SyslogIdentifier=ihris

RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
```
#### Run the server
If you are using the example service file, the following commands will ensure the server restarts on failure and reboot
```
sudo systemctl start ihris 
```
This will start the service. The first time you run this, you may need to reload the configuration files
```
sudo systemctl enable ihris
```
