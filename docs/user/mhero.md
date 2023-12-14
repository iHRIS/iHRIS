# mHero

## Overview

*mHero* is a two-way, mobile phone-based communication system that connects ministries of health and health workers. It uses data from existing local health information systems to deliver messages via locally popular communication channels. It reduces the barriers that can exist between health workers and their support systems, playing a critical role in ensuring effective and efficient responses, particularly in a crisis.

Health officials can use mHero to:

1. Communicate both routine and urgent messages to health workers.
2. Target messages to health workers based on cadre, location, or skill set.
3. Collect critical information that powers resilient health systems, including stock levels, routine and one-time assessments, and validation of health worker and facility data.
4. Build capacity and provide support to health workers, to give them the information, skills, and encouragement to deliver quality health services.

*mHero* is not a new technology. Instead, it is a new way to connect data from existing technologies to allow for targeted, real-time communication. It does so by using global interoperability standards for health information exchange (FHIR). In other words, mHero can help platforms speak in a common language and easily share data.

IntraHealth International and UNICEF created mHero in August 2014 to support health-sector communication during the Ebola outbreak in Liberia. The original version of mHero connected Liberia's health workforce information system, iHRIS, with RapidPro, a platform that delivers basic text and audio messages. The use of RapidPro made it possible to reach most Liberian frontline health workers using only basic mobile phones.

Since the end of the Ebola crisis, the Ministry of Health and Social Welfare in Liberia has integrated the platform into its health information system infrastructure to meet ongoing communication needs for various health services. Several other countries have also tested or deployed mHero.

The technology behind mHero has also evolved since the initial deployment in Liberia. Both advancements in technology, as well as varying conditions and needs in other countries, inspired IntraHealth to make mHero more interoperable. It can operate with other communication platforms and any health information systems compliant with the global Fast Healthcare Interoperability Resources (FHIR) standards. Read more about the technology behind mHero.

mHero’s origin and ongoing use and development illustrate how the platform is flexible, scalable, and sustainable by governments in low- and middle-income countries.

## Technology

mHero is an innovative way to connect existing technologies.

**Current architecture of mHero**

![Alt text](../img/mhero architechture.png 'mHero Architechture')

**mHero** brings together data from existing health information systems and locally popular communication platforms to enable targeted, real-time communication. This connection is made by using global interoperability standards for health information exchange, specifically Fast Healthcare Interoperability Resources (FHIR). Using FHIR makes mHero widely interoperable. It can talk with other FHIR-compliant data systems, such as drawing patients' phone numbers stored in OpenMRS.

**mHero**’s architecture is flexible to also quickly add connections to Facebook Messenger and WhatsApp.  As smartphones become more common, images, audio clips, and videos can be sent and received at very low cost. Moreover, the new WhatApp business accounts allow for forms, automated replies, and other functionality not found on regular consumer accounts, adding greater power in data collection.

**mHero** can also be implemented alongside a traditional call center, where curated messages can enable trained staff to respond with speed and effectiveness.

Finally, we are also enhancing **mHero** to incorporate Natural Language Processing, a form of artificial intelligence. That means that frontline health workers can ask questions using normal speech and the system can respond with the appropriate government-approved messages.

## Assumptions

!!! important "What are some of the assumptions of mHero?"

- iHRIS is installed or can be installed
- It is necessary to have iHRIS v5 or v4.3.

- The health worker contact information is complete and up-to-date.

        The essential health worker information for mHero includes:

        - name
        - phone number

By default mHero also displays facility, job title, and cadre, but these fields can be customized. You may also want to include other fields such as organizational affiliation.

## Data Cleaning

There are several approaches to cleaning data depending on what needs to be corrected in the data.

Scripts can be run on iHRIS and mHero to identify issues with records such as phone numbers with invalid formats (i.e. too many or too few digits, inappropriate characters, etc.), records that share the same phone number, records without phone numbers, and more.

Some records may be easily updated, for example if the country code is included but should not be then that can be simply deleted.

To confirm whether the name associated with a phone number is correct, a simple workflow can be sent through mHero.

However, updating records where there is information missing is a manual process. For this reason, we recommend conducting regular data cleaning on an ongoing basis.

## Communication Platform Identification

- A communication platform needs to be  identified based on the channels that health workers frequently and easily use and the platform has been configured to send out messages.

The communication platform should be one that is accessible by the largest number of health workers. For example, if most health workers in the capital area prefer WhatsApp but in the other regions of the country most health workers have only basic mobile phones, a SMS platform is a better fit than WhatsApp. mHero initially used RapidPro as the communication platform since it offers a simple interface for building flows and can be easily connected to SMS channels.

In addition to the communication platform being identified, it is essential to have the platform configured to send out messages. This may include obtaining a short code for sending out SMS messages, setting up a WhatsApp Business Account, or phone numbers/accounts set up for other platforms and channels. This step can take a significant amount of time so it is recommended to explore the possibility of leveraging existing channels.

## Content Development Plan

There needs to be a plan for developing the content of messages and message flows.

Whether there is existing content or the content needs to be developed, there are key content creation considerations for different digital platforms. For example, with SMS it is necessary to limit the number of characters to 160, or the way people communicate via Facebook Messenger may be less formal. 

## mHero launching Plan
There needs to be a plan for introducing mHero to health workers.

It is recommended to introduce mHero to health workers prior to sending out the first message. You should inform them about:

 ■ what mHero is
 ■ how it will be used
 ■ who the messages are coming from and who will review and respond
 ■ how often they can expect messages
 ■ whether they will be expected to respond or initiate communication (if they will be expected to initiate communication then you need to explain how they will do this)
 ■ the costs (if any) to the health workers when they send messages
 ■ any option for them to opt out of receiving messages (this may be required in some countries)

As you can see, this is too much information to send via SMS when the first message goes out so it will need to be communicated in a different way - email, memo, during training or other gathering, etc. If you are unsure about some of those details when initially deploying mHero (for example, perhaps initially the health workers will not be expected or required to respond or initiate communication but that may change later), you don't need to include that information at the outset but should provide clear instructions when there are changes.

## Data Analysis Plan
There needs to be a plan for analyzing the data and taking action based on results

When asking health workers to send information related to their work activities, facility conditions, or other information, it is necessary to acknowledge their contributions and make use of the responses and data collected. This may look like generating reports that can demonstrate the need for additional funding, preparing a plan to provide supplies or other support to a facility facing unexpected needs, or countless other responses. When health workers know that the information they provide will serve some purpose, they will be more willing to respond to future requests.

## Sending Messages with mHero

!!! important "What is MHERO?"
MHERO is acronym for the Global Open Facility Registry.
MHERO is a shared repository for facility information. The information in the repository can vary and may include:

- Facilities
- Jurisdictions such as districts, regions, county, country , with the highest in the hierarchy being a country and the lowest being a facility.
- Services offered by facilities. This may include services such as malaria testing, HIV care, clinical information like vaccination
- Organizations that manage facilities

## Log In

In order to access mHero, type the mHero url (web address) into the address bar of any browser A sample login screen is shown in the figure below.

![Alt text](../img/mHerologin.JPG 'MHERO Login Page')

The email address plus the user password is required to login to the system. On clicking the Login button, the details entered are validated and one is allowed access if the details are correct. Otherwise, access is denied.

## Reset Password

To reset your password, Click >Forgot Password > Submit
A reset password link will be sent via the email address to reset your password.

![Alt text](../img/forgot_password.jpg 'MHERO Forgot Password Page')

Click the link to Back to login and log in as normal

## Dashboard

Once you successfully log in to the system, the dashboard appears:

![Alt text](../img/dashboard.JPG 'MHERO Dashboard Page')

## Logging Out

To log out of the MHERO system:
Browse to the upper right corner on any page, click Log Out.

![Alt text](../img/log_out.JPG 'MHERO Log Out Page')

The Welcome page appears. You will have to re-enter your username and password to regain access to the system.

