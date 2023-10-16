# Creating custom routes/API

iHRIS comes with several endpoints/api that you can use to create, update, delete and get data. However, it might happen that non of the existing routes satisfies your needs. iHRIS offers you a way to create your own custom routes. Follow below steps to create a custom route

* Create the file that will have source codes of your route. The file must be created inside the route folder of your site i.e if your file name is called performance.js and your site is called sierraleone and located under iHRIS/ihris-backend/sierraleone then the path for your custom route must be iHRIS/ihris-backend/sierraleone/routes/performance.vue. You are allowed to create directories under iHRIS/ihris-backend/sierraleone/routes and put your routes inside those directories. Now you should be ready to write logics about your APIs inside performance.js

* The last step is to register your routes file into iHRIS, and this is done into configuration file. open the configuration file of your site and register your routes file as in below. <br>
For our performance.js routes file, the registration will look as follows

```json
{
  "name": "app:site:routes:performance:mount",
  "valueString": "performance"
},
{
  "name": "app:site:routes:performance:path",
  "valueString": "performance.js"
},
{
  "name": "app:site:routes:performance:authenticate",
  "valueString": "true"
}
```

**WHERE** <br>

**mount** is the unique name that differentiate your custom APIs from the rest. so if you have a route/API called addPerformance inside performance.js, this route will be accessed as performance/addPerformance <br>

**path** is the path to your routes file relative to the routes directory of your site, for our case it should be relative to iHRIS/ihris-backend/sierraleone/routes

**authenticate** Whether the route is accessible to authenticated users only or not
