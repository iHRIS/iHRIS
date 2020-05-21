# Permissions
## Current thinking (May 20)

* Permission: read|write|delete
* Profile ID (Practitioner or ihris-practitioner)
** should be resolvable on the FHIR server
** won't allow full URLs, won't resolve from other servers (perhaps change in later iteration)
* Field
** only top level fields
** extensions can include URL (also only top level extensions)
* Instance ID (for record level access, but also for specific ValueSets/CodeSystems)

Allowed IDs are: [A-Za-z0-9\-\.]{1,64}

Separator?  /

### Examples

* read/ihris-practitioner/*/*
* read/ihris-practitioner/Practitioner.name/1234


## Old thinking
Based on SMART on FHIR scopes

* user/[Resource|\*].[read|write|\*]

Should all start with user.  In the future, may support things like practitioner which would
be based on the "current" practitioner, but that may not make sense for iHRIS.

Perhaps include this:

* user/[Resource/[ID|\*]|\*].[read|write|delete|\*]

This allows finer control of codesystems and valuesets.

```
user/Practitioner/*.*
```
is the same as
```
user/Practitioner.*
```

### Examples

* user/CodeSystem/ihris-job.\*
* user/ValueSet/ihris-job.\*
* user/CodeSystem.read
* user/ValueSet.read
* user/Practitioner.read
* user/PractitionerRole.read
* user/PractitionerRole.write

### Field Level

Higher level tasks override more specific ones.  Should include field level definitions as an option
as well, but this will require much more specific editing.

* user/Resource#FHIRPath.[read|write|\*]

#### Examples

* user/Practitioner#Practitioner.name.\*
Could start with top level field support intially.

Complex (perhaps for the future):
* user/Practitioner#Practitioner.identifier(system = 'http://example.org/passport').value.\*

### Future enhancements

Allow the resource to be a full URL to a structure definition?  Then they can only read/write 
instances of resource that are that profile.
**This seems required to handle Basic extensions**

* user/http://ihris.org/fhir/StructureDefinition/ihris-practitioner.*
