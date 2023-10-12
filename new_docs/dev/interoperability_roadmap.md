# iHRIS Interoperability Roadmap

This interoperability roadmap aims to outline the data exchange
standards supported by iHRIS and the plans for data exchange with other
components of the OpenHIE (Open Health Information Exchange)
architecture.

Interoperability is crucial for seamless data sharing and integration
across different health information systems. By adhering to widely
accepted standards, iHRIS aims to enhance data exchange, improve
interoperability, and facilitate the efficient use of human resource
information in the healthcare domain.

**Prior to 2019:** Older versions of iHRIS (4.x ) have always supported
interoperability through custom data mapping modules. These modules
mapped SQL data to different international standards like Fast
Healthcare Interoperability Resources (FHIR), Care Services Discovery
(CSD) and Sharing Value Sets (SVS).

**Current State Assessment:** From mid-2019, a massive upgrade was
undertaken to modernize iHRIS. This included designing a whole new
interface, improving reporting and dashboards, and using newer underline
technologies like NodeJS, VueJS.

The most significant upgrade was to make **iHRIS Natively FHIR
Compliant**. As such, every element of iHRIS is based on FHIR, from
defining system configurations to data structures and even how the front
end is designed and rendered.

![Alt text](../img/interoperability.png 'Interoperability Roadmap')

**Data Exchange Standards Supported by iHRIS:**

As stated above, iHRIS is Natively FHIR Complaint. As such iHRIS
implements the HL7 FHIR standard for exchanging HR-related data, such as
employee demographics, qualifications, job roles, training and any other
data one would want to collect on health workers. FHIR enables seamless
integration and data exchange with other health information systems
within the OpenHIE framework.

iHRIS exposes the **FHIR API** that allows iHRIS to publish and consume
health worker data with other FHIR-compliant systems like GOFR, OpenMRS,
and DHIS2 to mention but a few.

iHRIS can also exchange data with both FHIR-compliant and
non-FHIR-compliant systems through the **OpenHIE Interoperability
layer**, using tools like OpenHIM and OpenFn. This layer enables
seamless communication and interoperability across various health
information systems within the OpenHIE ecosystem.

**What next:** From late 2023 to 2024, iHRIS development team will be
working to implement the necessary features and functionality to support
adding the **Aggregate data exchange (ADX) standard**. Currently iHRIS
can send individual data (e.g. health worker job title), this addition
will enable iHRIS to share aggregate data (e.g. number of nurses in a
facility) with systems like DHIS2, to link HR data with service delivery
data.

**Conclusion:** The interoperability roadmap for iHRIS outlines the data
exchange standards supported by iHRIS, mainly HL7 FHIR. Additionally, it
highlights the planned data exchange initiatives with other OpenHIE
architectural components such as the Facility Registry, Terminology
Service, Client Registry, Health Workforce Management, and
Interoperability Layer. By adhering to these standards and collaborating
with other OpenHIE components, iHRIS aims to promote interoperability,
enhance data exchange, and contribute to efficient health workforce
management and planning.
