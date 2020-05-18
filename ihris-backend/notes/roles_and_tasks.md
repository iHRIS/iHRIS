# Permissions
Based on SMART on FHIR scopes

* user/[Resource|\*].[read|write|\*]

Should all start with user.  In the future, may support things like practitioner which would
be based on the "current" practitioner, but that may not make sense for iHRIS.

Perhaps include this:

* user/[Resource/[ID|\*]|\*].[read|write|delete|\*]
Or?
* user/[Resource#[ID|\*]|\*].[read|write|delete|\*]

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
