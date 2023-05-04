# Creating custom components

This option can be used to create a custom page that implements logics that cant be easily implemented by using iHRIS FHIR Pages. Below are the steps to create a custom component.

+ The root directory of custom components is iHRIS/ihris-frontend/site meaning all your custom VueJS components must be saved inside this root directory. Sub-directories can be created within this root directory and then components get saved into those sub-directories.
+ Now open your component file and add logics about your component. You may refer on the section that explains how to add a custom route/end-point or module in case you want to add a nodeJS route/end-point or module.
+ Now create a menu that points to your custom component.
  Below are the main hints on creating a menu of a custom component
    + The url must start with /custom followed by the name of your custom component.If your component is nested in subfolders within your site directory then append the path query into the url, and the path must be relative to the root directory of custom components directory (iHRIS/ihris-frontend/site). i.e if your custom component file is named performance.vue and is located inside iHRIS/ihris-frontend/site/components/evaluation then the url for the component will be /custom/performance?path=components/evaluation.
    + You can use query parameters to send any data to your component i.e if you want to include an id then the url would look like /custom/performance?path=components/evaluation&id=23
  Below is a full example for how a menu of a custom component can be created, this assumes that the menu is a sub-menu of Person

```json
      {
        "name": "site:nav:menu:person:menu:performance:text",
        "valueString": "Performance Management"
      },
      {
        "name": "site:nav:menu:person:menu:performance:url",
        "valueString": "/custom/performance?path=components/evaluation"
      }
```

+ Remember to upload the menu file into hapi after making these changes, for more details you may refer on the section that talks about creating/editing menus.

!!! important "Do not include the component extension on the url i.e /custom/components/performance<s>.vue</s>"
