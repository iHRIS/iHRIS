# iHRIS Apps

There are some usecases where you need to create multiple components to perform a specific common task. iHRIS allows you to create an app to address such a usecase. iHRIS apps are expected to be webapps and can be created in any programming language. Below are the steps to create an iHRIS apps.

* Pick a language of choice (recommended VueJS) and start building the app. If you are a VueJS developer then you are lucky, you dont need to start everything from scratch, clone the ihris app template repo from [https://github.com/iHRIS/ihris-core-apps.git](https://github.com/iHRIS/ihris-core-apps.git) that comes with many supporting resources to help you quickly build an app. The template can be cloned with command
```bash
git clone --single-branch --branch startup-template https://github.com/iHRIS/ihris-core-apps.git startup-template
```

* At this stage you should get ready your app for production deployment. Depending with the language/framework you have used, some frameworks like Angular, react, Vue requires code to built for production deployment, this is the right stage to do so.

* Add metadata about your app. iHRIS uses manifest file to properly handle your app. Create manifest.webapp file and place it at the root directory of your built source code in step 2. The manifest.webapp should be in JSON format and must have below details \n

    + version (required) - This specifies the version of your app
    + name (required) - This is the name of your app that will be displayed under list of installed iHRIS apps
    + description (optional) - This is a description of your app
    + launch_path (required) - This is the file on your app that iHRIS will lauch when users run your app
    + icons (required) - This is an icon that iHRIS will use together with name to display on the list of installed apps.
  Below is an example of manifest.webapp
  
```json
  {
    "version": "1.0.1",
    "appType": "APP",
    "name": "Dictionary",
    "description": "Translation of iHRIS texts into multiple languages",
    "launch_path": "index.html",
    "icons": {
        "16": "dictionary.jpeg",
        "48": "dictionary.jpeg",
        "128": "dictionary.jpeg"
    },
    "developer": {
        "name": "Intrahealth - Digital Health Team",
        "url": "http://digitalhealth.intrahealth.org"
    }
  }
```

* Now its time to zip your built files ready for installation into iHRIS. Your app files must be at the top level of the zip.

    ![Alt text](../img/zipping_app.gif 'Zipping App')
!!! important "To zip properly, open the folder that has your built files, select all the files and zip them. This way, the files are on the parent level of the zip file"

* Now its time to install the app into iHRIS. To install your app, open iHRIS and click iHRIS apps. A page that lists all installed apps will open, click the plus (+) icon, then browse to your zipped app, select it and click the install button.

  ![Alt text](../img/install_app.gif 'Install App')

## `Uninstalling an iHRIS app`

To uninstall an existing iHRIS app, open iHRIS and click iHRIS apps. A page that lists all installed apps will open, click the minus(-) icon, then click the minus(-) icon of the app you want to uninstall.

  ![Alt text](../img/uninstall_app.gif 'UnInstall App')