# MHERO

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

## View and search/filter contacts

The table of contacts is used for many of the tasks you will do within mHero so it merits an explanation before explaining how to use the platform. Note: there are two tables of contacts - one within the mHero module, used for selecting contacts to send messages/flows to; and one within the People module, used for viewing records in the system.

The table of contacts contains records for all health workers who have records in iHRIS, RapidPro, or mHero (or other connected registry). Each row contains information for one health worker. By default you will see 10 rows of results per page. In the bottom right corner of the table you will see some information about the results that are displayed. It tells you the number of rows being displayed per page followed by which results within the full set that are displayed (for example, "1-10 of 68" means the first 10 results within the set of 68 are being displayed).

You can use the backward and forward pointing arrows to navigate through the pages of records.

You can change the number of records displayed per page in the table by clicking the drop down menu next to "Rows per page" at the bottom right corner of the table. You can choose to display 5, 10, 20, or 50 records. The table will update once you have made your selection. Note: if there are more than 10,000 health worker records you will not have the option to display all on the same page due to the time it would take to pull up all of that data and browser capacity. You will have to select the option to see 10,000 records per page and view or select records in batches of 10,000.

To search by name type all or part of their given name or surname in the space that looks like a tab and is labeled "Fullname". This is next to the table title ("Employee List"). You can search by a partial name and will see results that contain those letters. You must hit Enter or Return in order to run the search. If you wish to remove the name search filter, delete what you have typed and hit Enter or Return again.

To search/filter by other fields (contact group/facility/job title/cadre) you click on the word in the field you wish to search. You can either type in a search word or scroll through the list to select a filter. To search, start typing what you want to search for and the list of options for that field will automatically filter to display matches; you can then select which match(es) you wish to use to filter the table. Alternatively you can scroll through the list to select the groups/facilities/job titles/cadres you wish to apply as filters. You can apply more than one filter including across more than one record field/column (i.e. two different groups or one facility plus one cadre).

To remove or clear a filter you can either click on the X that is at the end of the field "tab" and that will clear all of the filters, or to clear a single filter at a time you can click on the search/filter term and touch the "Delete" key on your keyboard.

Add a contact
If the iHRIS instance has not been updated to v5, adding contact records should be done in the iHRIS instance that is already in use, not in the iHRIS v5 shell. Contacts created in iHRIS v5 shell will not be synced to the primary iHRIS instance.

Adding a contact in the iHRIS v5 shell where the mHero module is found will create a contact that can be sent a message/flow via mHero, but it will not add the contact to the main iHRIS instance. For this reason the data fields in the contact record are not the complete set that exist in iHRIS. To illustrate, you will be able to enter information such as name, contact details, job title, etc., but you will not be able to enter information such as from which institution the health worker received their degree, previous job positions, trainings they participated in, languages they speak, etc.

1. To add a new contact to your mHero instance, click on "Add Person" either in the dashboard on the home page or in the left side navigation bar.

2. Enter the information about the contact to the form. You can include identifiers and basic demographic information, contact information and also information about the health worker's position. You can either scroll down the page or click on a section in the right side navigation panel to jump to that section.

Note the required fields which are indicated by red asterisks. The required fields vary by country.

3. When you are finished adding information to the contact's record, click on the "SAVE" button in the top right corner of the page.

If you try to save the record without putting text in all of the required fields you will not be able to save the record. In that case, you can scroll down the page to see the uncompleted required fields highlighted with a red frame.

Add multiple contacts (bulk upload)
If the iHRIS instance has not been updated to v5, adding contact records should be done in the iHRIS instance that is already in use, not in the iHRIS v5 shell. Contacts created in iHRIS v5 shell will not be synced to the primary iHRIS instance.

Modify contact information
If the iHRIS instance has not been updated to v5, modifying contact records should be done in the iHRIS instance that is already in use, not in the iHRIS v5 shell. Contacts modified in the iHRIS v5 shell will not be synced to the primary iHRIS instance.

The only existing contacts that you will be able to modify are those that are stored in the iHRIS v5 shell. To modify contacts stored in the main iHRIS instance you must do so within the main iHRIS instance.

1. To modify the record of an existing contact, click on "Search People" either in the dashboard on the home page or in the left side navigation bar.

2. Locate the contact whose record you want to modify. You can do this by scrolling down through the table of contacts (including increasing the number of rows displayed per page) and by searching or applying filters. You can find guidance related to viewing and searching contacts here.

When you have identified the contact whose record you want to modify, select it by clicking anywhere in the row in the table of contacts.

3. The next page will display the fields included in each contact record and any associated information saved to that record. To edit any of the record fields click on the "EDIT" button at the top right corner of the page.

4. You can then modify any of the information saved to the contact record or you can add information where information has not previously been added. Once you have finished making changes and additions click the "SAVE" button in the top right corner of the page.

Note that there may be additional required fields than what was required when adding a new record. Ensure that you provide information for all required fields (which are indicated with a red asterisk).

If you do not wish to save your changes you can click on the "CANCEL" button which is next to the "SAVE" button.

Manually opt out a contact from receiving messages
In addition to contacts opting out of messaging by sending a trigger word, it is also possible for system users to manually opt out individual contacts through the mHero interface.

1. To manually opt out a contact from receiving messages, click on "MHERO" on the left side navigation panel, then click on "Block Contact".

2. Search for the contact. To do so follow the instructions in the above section "View and search/filter contacts".

3. Select the contact(s) whom you would like to opt out from receiving messages by ticking the box to the left of their name in the table. Then click on "BLOCK [n] SELECTED", which is at the bottom right corner of the table, to opt the contact(s) out of future messaging.

Note that the button may be only partially visible, as shown here:

View contact groups of a contact
Many health workers will belong to multiple contact groups, however only one contact group will be visible in the Employee List table.

1. To view all contact groups that a particular health worker belongs to, click on "MHERO" on the left side navigation panel, then click on "Contact Groups".

2. Search for the contact. To do so follow the instructions in the above section "View and search/filter contacts".

3. Select the contact whose contact group(s) you would like to view by ticking the box to the left of their name in the table. Then click on "UNSUBSCRIBE" below the table in the left corner to see all contact groups that the contact is in (and which you can unsubscribe the contact from).

Note that the button may be only partially visible, as shown here:

4. You will see the groups that the health worker belongs to in the "Group Lists" table. You can search and scroll through pages for health workers that belong to many groups.

When you are done looking at the list of contact groups, click the X in the top right corner to not go through with unsubscribing the health worker from any of their contact groups.

Make changes to a contact group (subscribe or unsubscribe contacts)
On the "Contact Groups" page within the mHero module:

1. Select the contacts that you would like to subscribe or unsubscribe from a contact group by ticking the boxes to the left of the names in the table. Note that you can only subscribe or unsubscribe at once so if you have contacts to subscribe and unsubscribe you will have to do those separately.

The following are some tips for making your selection:
1.1. You can select all contacts on a page by clicking on the box farthest to the left in the table header row. Note that this will not select all contacts on all pages, only for the page you are viewing when you click to select all.

1.2. You may want to make selections on multiple pages so will want to navigate between pages of records or change the number of rows displayed per page. Follow the instructions in the above section "View and search/filter contacts".

1.3. You may want to search through all records and apply filters to make your selection. To do so follow the instructions in Follow the instructions in the above section "View and search/filter contacts".

2. Subscribe or unsubscribe the contacts from a contact group

2.1. Once you have completed selecting contacts, click on the button at the bottom of the page that corresponds to what you would like to do: the red UNSUBSCRIBE button is in the left corner and the blue SUBSCRIBE button is in the below the table in the middle.

Note that the buttons may be only partially visible, as shown here:

2.2. In the pop-up window, below the word "Group List" you will see a list of the possible contact groups from which you can subscribe or unsubscribe contacts.

2.3. You can either scroll through this list to select the desired contact group or you can use the search function in the "tab" at the top of the list. If you wish to search by typing the group name you can type a partial group name and you will see all contact groups that match what you typed. After you have typed the full or partial group name, you need to hit the "Enter" or "Return" button to trigger the search.

2.4. Select the contact group(s) by clicking in the box to the left of the group name.

2.5. You can review the contacts that you are subscribing/unsubscribing in the table at the bottom of the pop-up window. If you see an error in this list you can click on the X in the top right corner of the pop-up window and you can revise your selection.

2.6. If you are finished selecting the contact group and reviewing the contacts you would like to subscribe/unsubscribe from that group, click on the green "+ SAVE" button (if subscribing) or the green "UNSUBSCRIBE" button (if unsubscribing).

You should see a new pop-up with a confirmation of the change.

Create a new contact group
On the "Contact Groups" page within the mHero module:

1. Click on the button in the bottom right corner (below the table) that says "Add New Group".

Note that the button may be only partially visible, as shown here:

2. In the pop-up box click where you see the word "Name" and type the name of the new contact group.

3. To create the new contact group click the button in the bottom right corner of the pop up box that says "+ SAVE".

You should see a new pop-up box that confirms the creation of a new group, saying "Success: Group Added Successfully"; click on the button that says "OK" to finish.

# Accessing Reports in mHero

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
