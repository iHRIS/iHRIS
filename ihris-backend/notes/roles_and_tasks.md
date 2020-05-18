# Permissions
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

## Examples

* user/CodeSystem/ihris-job.\*
* user/ValueSet/ihris-job.\*
* user/CodeSystem.read
* user/ValueSet.read
* user/Practitioner.read
* user/PractitionerRole.read
* user/PractitionerRole.write

## Field Level

Higher level tasks override more specific ones.  Should include field level definitions as an option
as well, but this will require much more specific editing.

* user/Resource#FHIRPath.[read|write|\*]

### Examples

* user/Practitioner#Practitioner.name.\*
Could start with top level field support intially.

Complex (perhaps for the future):
* user/Practitioner#Practitioner.identifier(system = 'http://example.org/passport').value.\*

## Future enhancements

Allow the resource to be a full URL to a structure definition?  Then they can only read/write 
instances of resource that are that profile.

* user/http://ihris.org/fhir/StructureDefinition/ihris-practitioner.*
