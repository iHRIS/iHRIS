# ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
If you are developing on iHRIS, use this command to dynamically recompile your project whenever new changes are saved.

```
npm run serve
```

### Compiles and minifies for production
If you are running this on production, run this command to generate minified files to serve. After this command has finished executing, copy the files from `ui/dist` to wherever your webserver serves content.

```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Config file
The ui config file sets options for the frontend component of the iHRIS website. Available options and examples are listed below.

### Header
There are two configuration options that can be set for the header

#### Logo
Place a link to an image file (prefereably png) to have a logo render in the header of your application.

```
"logo": "https://www.ihris.org/sites/ihris/files/ihrislogo2019a.png"
```

### Dashboards
A list of dashboards to show on the home page. If no dashboards are shown, then all dashbaords will be rendered.

```
"dashboards": ["Sample Dashboard 1", "Sample Dashboard 2"]
```

#### Site
The text set for the site configuration will be rendered in the header of your application.

```
"site": "Demonstration site"
```

### Backend
This is a link to where the [server](https://github.com/iHRIS/iHRIS/tree/master/server) component is running. Depending on your configuration, it may or may not need to include the port the application is running on.

```
"backend": "http://link.to.backend""
```

### Kibana
Kibana is used to render dashboards on the home page. Update the config file to include a link to your kibana installation. You will also need to add this link to the [server](https://github.com/iHRIS/iHRIS/tree/master/server). To learn more about kibana, visit their [official website](https://www.elastic.co/kibana)

```
"kibana": "http://yoursite.org/kibana"
```

### Demo
If you are demoing your site and do not wish to bother with authentiction credentials, you can disable authentication and role checks by setting the demo config.

```
"demo": true
```

## mHero
mHero is a two-way, mobile phone-based communication system that uses basic text messaging, or SMS, to connect ministries of health and health workers. To enable mHero, you need to setup an [emNutt server](https://github.com/intrahealth/emNutt). You also need to update your configuration file and set the mHero configuration settings shown below. Learn more about mHero by visiting the [official website](https://www.mhero.org/)

### installed
This indicates that mHero is set up and ready to use. It is responsible for displaying the mHero menu as well as allowing access to the necessary pages. 

```
"mHero": {
  "installed": true
}
```

### dashboards
Once you have set up dashboards inside your kibana instance, you can render those dashboards on the mHero reports page. List the the names of the dashboards you wish to display on this page.

```
"mHero": {
  "dashboards": ["My sample dashboard", "A different dashboard"]
}
```


# Using Docker
After cloning and customizing the configurations run the following commands
```
cd ui
```

Build the image
```
docker image build -t ihris-ui .
```

Run the image (as a background process)
```
docker container run --publish 8001:8080 --detach --name ihris-ui ihris-ui
```

Access the UI 
```
http://localhost:8001
```
