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

You can edit the file ihris.service in this directory and copy it to /lib/systemd/system/.  You will need to set
the correct WorkingDirectory.

After copying the file you will need to reload the daemon:
```bash
sudo systemctl daemon-reload
```

To enable the service when the server restarts:
```bash
sudo systemctl enable ihris.service
```

#### Run the server
This will start the service. 
```bash
sudo systemctl start ihris.service
```

You can view the output with journalctl with either of these commands:
```bash
journalctl -xe
journalctl -u ihris.service
```

After making changes you can update the file with:
```bash
sudo systemctl restart ihris.service
```

To stop the service:
```bash
sudo systemctl stop ihris.service
```
