# iHRIS Apps
There are some usecases where you need to create multiple components to perform a specific common task. iHRIS allows you to create an app to address such a usecase. iHRIS apps are expected to be webapps and can be created in any programming language.

## `Prerequisites for an iHRIS App.`

### Customize the _'manifest.webapp'_ and define the metadata for the app

The file manifest.webapp, in the 'ihris app' folder should be customized as shown below:

![Alt text](../img/manifest.JPG 'Customizing Manifest')

This is an example of the details of a 'Dictionary' iHRIS app.

* Define the name of the app,
* Define the launch path of the app
* Define the icons to be used for the app.

Note: Developer details are optional.

## `Zip the App`

Once the app is developed, it should be zipped. The app, the icons, the files should be at the top level of the folder for the app to run.

![Alt text](../img/zipped_app_contents.JPG 'Customizing Manifest')

!!! important "To zip properly, open the app, select the files and zip the files. This way, the files are on the parent level of the zip file, no folder is created on level 1."

 Note: _Avoid zipping the folder and having the contents in the 2nd level,as it will not run._

## `Install the app`

Once the app is developed,install the app.

To install,click on iHRIS apps, on iHRIS, Browse for the folder containing the app.

![Alt text](../img/browse_ihirs_app.JPG 'Customizing Manifest')

Select the file to be uploaded and click ‘Upload’

Once installed, the app is available for use by iHRIS users

## `Uninstalling an iHRIS app`

To uninstall an existing iHRIS app:

Click on iHRIS apps

![Alt text](../img/uninstall_app.JPG 'Customizing Manifest')

Click the minus sign, select the app to be removed and click on it.

![Alt text](../img/uninstall_app_2.JPG 'Uninstall App')**