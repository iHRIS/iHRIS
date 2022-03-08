# iHRIS Health Workforce Information Systems Software implementation Guide

This **iHRIS implementation Guide** describes the set up of iHRIS (configs, modules, Library ) and data (Practitioner,PractitionerRole, Organization e.t.c) needed to have the intergrated Human Resource Information System. This guide was put together by **IntraHealth International** is a based on FHIR and HL7.

### Background

iHRIS, IntraHealth International's free, open source software, helps countries around the world track and manage their health workforce data to improve access to services. Countries use it to capture and maintain high-quality information for health workforce planning, management, regulation, and training.

Demo or download the current version of iHRIS.

iHRIS is built on a flexible framework that allows ministries of health, professional councils, and health service delivery organizations to adapt applications for a wide variety of uses. Developed in collaboration with national stakeholders beginning in 2005, with support from USAID, iHRIS is used in more than 20 countries to manage over a million health worker records at a potential cost savings of over $275 million when compared to commercial software.

### Key Approaches

iHRIS has been developed into multiple, interoperable applications to meet the needs of a variety of stakeholders and support health workers throughout their life cycle:

    - iHRIS Manage allows tracking and management of health workers actively engaged in service delivery
    - iHRIS Qualify enables professional councils and associations to register, license, and regulate health workers to support increased quality of care
    - iHRIS Plan projects the likely changes in the health workforce under different scenarios and compares them with projected needs
    - iHRIS Retain, developed in collaboration with the World Health Organization, helps countries plan and cost recruitment and retention interventions
    - iHRIS Train assists in tracking and managing health worker preservice education pipelines and in-service training.

**Global Support Community:** We open access to iHRIS through publishing the software, source code, and other resources at www.ihris.org and by supporting a global community of software developers and information technologists with an online forum and interactive discussions and training sessions. The community raises and resolves technical issues on its own; contributes code to iHRIS; provides tools, guidance, and case studies for the iHRIS Implementation Toolkit; and translates iHRIS applications into other languages.

**International Standards and Interoperability:** iHRIS conforms to a variety of international standards for data exchange to ensure that data that might otherwise be siloed are accessible to all parts of a health system. We worked with an international standards organization, Integrating the Healthcare Enterprise, to develop a new global standard for exchanging health worker information. In addition, IntraHealth has collaborated in the Open Health Information Exchange (OpenHIE) initiative, including leading the development of a health worker registry that enables countries to link the various systems (including iHRIS) in their health information architecture.

### Building iHRIS IG

#### FHIR ShortHand Files

iHRIS IG is developed in [FHIR Shorthand (FSH)](http://build.fhir.org/ig/HL7/fhir-shorthand/), a domain-specific language (DSL) for defining the content of FHIR Implementation Guides (IG).

After you check out iHRIS IG from Github, add the _.fsh_ files for your profiles, codesystems, valuesets e.t.c in _/fsh/_ folder

#### Set iHRIS IG template paths 

You need to set the path to the iHRIS IG template folder or else the publisher will give errors. To do this go to the 
_/fsh/ig-data/ig.ini_  and then set the template value to the full path to the _/fsh/ig-data/ihristemplate_ i.e _/User/nobert/FHIR/iHRIS/fsh/ig-data/ihristemplate_

#### Compiling with SUSHI

Install SUSHI (the FSH compiler), [as instructed here](http://build.fhir.org/ig/HL7/fhir-shorthand/sushi.html). 

To compile iHRIS IG, open a command window and navigate to the directory where iHRIS IG has been checked out. Issue the following command:

`$ sushi fsh -o .

NOTE: With the latest publisher, sushi is part of the package, so you can sometimes skip the above step.

#### Running the IG Publisher

Next, 

Download the latest publisher using this __updatePublisher.sh_ file like this on linux `./_updatePublisher.sh`

Now run:

LINUX:   `JAVA -jar input-cache/org.hl7.fhir.publisher.jar -ig .`

This will run the HL7 IG Publisher, which will take several minutes to complete. After the publisher is finished, open the file _/output/index.html_ to see the resulting IG.

### Further Customization of the IG

Introduce customizations of the IG into the following files:

* **Menus:** Edit the _/input/include/menu.xml_ file
* **List of pages and artifacts to be included in the IG:** Edit _/input/ImplementationGuide-ihris.ig.json_ file. See [ImplementationGuide resource](https://www.hl7.org/fhir/implementationguide.html) for details. 
* **Additional pages, images, other content:** Add files to _/input/pagecontent_ directory, and link them to menus or other pages.
* **Version history:** Edit _/package-list.json_.