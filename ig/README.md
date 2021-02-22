# iHRIS Health Workforce Information Systems Software implementation Guide

This **iHRIS implementation Guide** describes the set up of iHRIS (configs, modules, Library ) and data (Practitioner,PractitionerRole, Organization e.t.c) needed to have the intergrated Human Resource Information System. This guide was put together by **IntraHealth International** is a based on FHIR and HL7.

## Building iHRIS IG

### FHIR ShortHand Files

iHRIS IG is developed in [FHIR Shorthand (FSH)](http://build.fhir.org/ig/HL7/fhir-shorthand/), a domain-specific language (DSL) for defining the content of FHIR Implementation Guides (IG).

After you check out iHRIS IG from Github, add the _.fsh_ files for your profiles, codesystems, valuesets e.t.c in _/fsh/_ folder

### Set iHRIS IG template paths 

You need to set the path to the iHRIS IG template folder or else the publisher will give errors. To do this go to the 
_/fsh/ig-data/ig.ini_  and then set the template value to the full path to the _/fsh/ig-data/ihristemplate_ i.e _/User/nobert/FHIR/iHRIS/fsh/ig-data/ihristemplate_

### Compiling with SUSHI

Install SUSHI (the FSH compiler), [as instructed here](http://build.fhir.org/ig/HL7/fhir-shorthand/sushi.html). 

To compile iHRIS IG, open a command window and navigate to the directory where iHRIS IG has been checked out. Issue the following command:

`$ sushi fsh -o .

NOTE: With the latest publisher sushi is part of the package so you can sometime skip the above step.

### Running the IG Publisher

Next, 

Download the latest publisher using this __updatePublisher.sh_ file like this on linux `./_updatePublisher.sh`


Now run:

LINUX:   `JAVA -jar input-cache/org.hl7.fhir.publisher.jar -ig .`

This will run the HL7 IG Publisher, which will take several minutes to complete. After the publisher is finished, open the file _/output/index.html_ to see the resulting IG.

## Further Customization of the IG

Introduce customizations of the IG into the following files:

* **Menus:** Edit the _/input/include/menu.xml_ file
* **List of pages and artifacts to be included in the IG:** Edit _/input/ImplementationGuide-ihris.ig.json_ file. See [ImplementationGuide resource](https://www.hl7.org/fhir/implementationguide.html) for details. 
* **Additional pages, images, other content:** Add files to _/input/pagecontent_ directory, and link them to menus or other pages.
* **Version history:** Edit _/package-list.json_.