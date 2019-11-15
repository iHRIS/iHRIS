# ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
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

### Header
There are two configuration options that can be set for the header

#### Logo
Place a link to an image file (prefereably png) to have a logo render in the header of your application.

#### Site
The text set for the site configuration will be rendered in the header of your application.

### Backend
This is a link to where the [server](https://github.com/iHRIS/iHRIS/tree/master/server) component is running. Depending on your configuration, it may or may not need to include the port the application is running on.

### Kibana
Kibana is used to render dashboards on the home page. Update the config file to include a link to your kibana installation. You will also need to add this link to the [server](https://github.com/iHRIS/iHRIS/tree/master/server)
