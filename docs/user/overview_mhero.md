# mHero Overview

## Assumptions

!!! important "What are some of the assumptions on mHero?"

- iHRIS is installed or can be installed
- It is necessary to have iHRIS v5 or v4.3.

- The health worker contact information is complete and up-to-date.

        The essential health worker information for mHero includes:

        - name
        - phone number

By default mHero also displays facility, job title, and cadre, but these fields can be customized. You may also want to include other fields such as organizational affiliation.

There are several approaches to cleaning data depending on what needs to be corrected in the data.

Scripts can be run on iHRIS and mHero to identify issues with records such as phone numbers with invalid formats (i.e. too many or too few digits, inappropriate characters, etc.), records that share the same phone number, records without phone numbers, and more.

Some records may be easily updated, for example if the country code is included but should not be then that can be simply deleted.

To confirm whether the name associated with a phone number is correct, a simple workflow can be sent through mHero.

However, updating records where there is information missing is a manual process. For this reason, we recommend conducting regular data cleaning on an ongoing basis.

- A communication platform has been identified based on the channels that health workers frequently and easily use and the platform has been configured to send out messages.

The communication platform should be one that is accessible by the largest number of health workers. For example, if most health workers in the capital area prefer WhatsApp but in the other regions of the country most health workers have only basic mobile phones, a SMS platform is a better fit than WhatsApp. mHero initially used RapidPro as the communication platform since it offers a simple interface for building flows and can be easily connected to SMS channels.

In addition to the communication platform being identified, it is essential to have the platform configured to send out messages. This may include obtaining a short code for sending out SMS messages, setting up a WhatsApp Business Account, or phone numbers/accounts set up for other platforms and channels. This step can take a significant amount of time so it is recommended to explore the possibility of leveraging existing channels.

● There is a plan for developing the content of messages and message flows

Whether there is existing content or the content needs to be developed, there are key content creation considerations for different digital platforms. For example, with SMS it is necessary to limit the number of characters to 160, or the way people communicate via Facebook Messenger may be less formal. For more guidance see the Message Development Tip Sheet.

● There is a plan for introducing mHero to health workers.

It is recommended to introduce mHero to health workers prior to sending out the first message. You should inform them about:

- ■ what mHero is
- ■ how it will be used
- ■ who the messages are coming from and who will review and respond
- ■ how often they can expect messages
- ■ whether they will be expected to respond or initiate communication (if they will be expected to initiate communication then you need to explain how they will do this)
- ■ the costs (if any) to the health workers when they send messages
- ■ any option for them to opt out of receiving messages (this may be required in some countries)

As you can see, this is too much information to send via SMS when the first message goes out so it will need to be communicated in a different way - email, memo, during training or other gathering, etc. If you are unsure about some of those details when initially deploying mHero (for example, perhaps initially the health workers will not be expected or required to respond or initiate communication but that may change later), you don't need to include that information at the outset but should provide clear instructions when there are changes.

- There is a plan for analyzing the data and taking action based on results

- When asking health workers to send information related to their work activities, facility conditions, or other information, it is necessary to acknowledge their contributions and make use of the responses and data collected. This may look like generating reports that can demonstrate the need for additional funding, preparing a plan to provide supplies or other support to a facility facing unexpected needs, or countless other responses. When health workers know that the information they provide will serve some purpose, they will be more willing to respond to future requests.

Architecture

mHero 2.1 is basically made up of three parts: a database of health worker information, a communication platform, and the mHero Connector which links the two other components. This connection is made by using global interoperability standards for health information exchange, specifically Fast Healthcare Interoperability Resources (FHIR) and Mobile Alert Communication Management (mACM).

The configuration that has so far been tested and deployed links iHRIS, the IntraHealth-developed health workforce information systems software, and RapidPro, UNICEF's communication platform that enables communication via text messages, interactive voice response (IVR), as well as other messaging tools such as Facebook Messenger, WhatsApp, Viber, and Telegram. Information from health worker records is sourced from iHRIS, including: phone or other contact details, names, cadres, facility names, locations. This information is used to contact health workers, both broadly and targeted. Message flows or message campaigns created in RapidPro are pulled into the mHero module which also uses the communication channels set up there to send out messages.

The architecture is flexible to connect different platforms and channels on both ends. Using FHIR standards makes it possible to connect any health information software that also uses FHIR, such as DHIS2, OpenMRS, and more. One possible use case with another software connected is pulling client phone numbers from OpenMRS to send reminders about upcoming appointments.

While mHero has to-date only delivered text-based messages via SMS, there are many communications channels that can be utilized to connect with health workers via locally popular channels. Through Facebook Messenger or WhatsApp it would be possible to send and receive multimedia content. mHero can also be connected with a traditional call center, where curated messages can enable trained staff to respond with speed and effectiveness. Finally, it is possible to incorporate natural language processing, permitting frontline health workers to ask questions using normal speech and the system can respond with the appropriate government-approved messages.
