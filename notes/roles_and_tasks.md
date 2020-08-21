# Permissions

Roles are a Basic profile with the following fields:

* primary[1..1] - boolean for filtering to assign to users
* role[0..\*] - reference to another role
* task[0..\*] - task definitions
 * permission - valueset for read|write|delete|\*
 * resource - resource (Practitioner or * for all allowed)
 * instance - id of the resource for a single instance
 * field - string that is a FHIRPath to a field in the structure definition
 * constraint - FHIRPath where expression required for this resource.  Not relevant for instances.  
It will be resolved as resource.where( contraint )

**delete only makes sense on a profile.  It will ignored if trying to set on a resource or including a field.**

## resolution

Add permission to user object based on roles (or custom module)


User.updatePermissions() adds all permissions from roles in User to the permissions array.

user.addPermission( permission, resource, id, constraint, field )
* sending field when it's already been sent without a field does nothing.  The higher level
permission overrides it. (order doesn't matter, sending the higher level later overrides it.)
 * read, Practitioner overrides read, Practitioner, anything
* sending an id when the higher level resource has already been sent does nothing. (order 
doesn't matter, sending the higher level later overrides it.)
 * read, Practitioner overrides read, Practitioner, 1234
* You can only set either id or contraint.
* if the resource is \* then the id and field can't be set

If the default is not limited by fields, then full access will be given regardless of other settings.  In this
case the ids and constraints won't even be stored for reference.
When multiple matches are available, first it checks the id, then the first loaded constraint 
that matches will apply, it will not be combined.  

For example if one role assigns 
* read, Practitioner, abc, null, name
and another does
* read, Practitioner, null, meta.profile = 'x', telecom

if Practitioner/abc is profile x, the user will only be able to see name.  For any other Practitioners that
are profile x they will only see telecom.

Further if there is also
* read, Practitioner, null, name.given = 'Test', birthDate
then it will depend on the order the permissions were loaded when the profile is x and the given name is 'Test'.

Basically getting too complex with overlapping permissions could cause odd circumstances, but this shoudl be
unlikely.

When there is a mix of wildcard and specific permissions/resources then the most specific will 
override when there are further constraints in the order below.  
Full permission will be allowed by anything that gives it.
* read Practitioner 
* \* Practitioner
* read \*
* \* \*

Based on the results returned from the previous step, when multiple match types have a restricted 
field list, it will be concatenated if multiples match.


Saved in structure as:
When the constraint is an ID it must start with '/'
```json
{
  "permission": 
  {
    "resource" : true | {
      "*": "field",
      "id": {
        "id1": "field" | true,
        "id2": "field" | true
      },
      "constraint": {
        "constraint1" : "field" | true
      }
    }
  }
}
```

### examples
Everything:  user.addPermission( "*", "*" )
```json
{
  "*": { "*" : true } 
}
```

Basic access to get any information:
* user.addPermission( "read", "StructureDefinition" )
* user.addPermission( "read", "ValueSet" )
* user.addPermission( "read", "CodeSystem" )
```json
{
  "read": {
    "StructureDefinition": true,
    "ValueSet": true,
    "CodeSystem": true 
  },
  
}
```

Complex example.  
* Resolution
 * If the id is 1234, user can see everthing.
 * If the profile is as below, those fields can be seen.
 * Otherwise the default fields can be seen.
* addPermissions
 * user.addPermission( "read", "Practitioner", null, null, "name" )
 * user.addPermission( "read", "Practitioner", null, null, "gender" )
 * user.addPermission( "read", "Practitioner", null, null, "birthDate" )
 * user.addPermission( "read", "Practitioner", "1234" )
 * user.addPermission( "read", "Practitioner", null, 
    "meta.profile = 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner'", "name" )
 * user.addPermission( "read", "Practitioner", null, 
    "meta.profile = 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner'", "gender" )
 * user.addPermission( "read", "Practitioner", null, 
    "meta.profile = 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner'", "birthDate" )
 * user.addPermission( "read", "Practitioner", null, 
    "meta.profile = 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner'", "qualification" )
 * user.addPermission( "write", "Practitioner", "1234" )

```json
{
  "read": {
    "Practitioner": { 
      // Can read all ihris-practitioner profiled Practitioners only for fields: name, gender, birthDate
      "*" : { "name": true, "gender": true, "birthDate": true },
      // Can read everything in Practitioner/1234
      "id" : { "1234": true },
      "constraint": {
        // Can read some fields when the profile is as given
        "meta.profile = 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner'":
          { "name": true, "gender": true, "birthDate": true, "qualification": true }
      }

    }
  },
  "write": {
    "Practitioner": { "id": { "1234" : true } } // write does not guarantee read
  }
}
```


read Practitioner abc 
read Practitioner profile = xx fields [ telecom ]
read Practitioner fields [ name ]

## Constraints

Constraints are FHIRPath expressions.  They will be processed through an exists() method to determine if the 
resource matches the constraint.  When the element can be an array, special care must be taken.

See http://hl7.org/fhirpath/

Use ~ instead of = to ignore case and extra whitespace for string comparison.

```
Patient.name.family ~ 'test'
```
Will work when there is only one name with family of 'Test', but will fail if there are 
multiple names.  To find any possible matches you can use:
```
Patient.name.exists(family ~ 'test')
```
To check for profile matches, the following can be used
```
meta.profile.exists( $this = 'http://ihris.org/fhir/StructureDefinition/test-profile' )
```

Multiple queries can be included.
```
meta.profile.exists( $this = 'http://ihris.org/fhir/StructureDefinition/test-profile' ) 
  and name.exists( family = 'Test' )
```

