# Permissions

Roles are a Basic profile with the following fields:

* primary[1..1] - boolean for filtering to assign to users
* role[0..\*] - reference to another role
* task[0..\*] - task definitions
** permission - valueset for read|write|delete|\*
** profile - valueset for list of StructureDefinitions by id that can be assigned permissions 
including \* which is the entire valueset, but not all possible StructureDefinitions.
** field - string that is a FHIRPath to a field in the structure definition
** resource - reference to a specific resource for access

**delete only makes sense on a profile.  It will ignored if trying to set on a resource or including a field.**

## resolution

Add permission to user object based on roles (or custom module)


User.updatePermissions() adds all permissions from roles in User to the permissions array.

user.addPermission( permission, profile/resource, field )
* sending field when it's already been sent without a field does nothing.  The higher level
permission overrides it. (order doesn't matter, sending the higher level later overrides it.)
** read, Practitioner overrides read, Practitioner, name
* sending a resource when the higher level profile has already been sent does nothing. (order 
doesn't matter, sending the higher level later overrides it.)
** read, Practitioner overrides read, Practitioner/1234

Saved in structure as:
```json
{
  "permission": 
  {
    "profile" : "field" | true
  }
}
```

### examples
Everything
```json
{
  "*": { "*" : true }
}
```

Basic access to get any information:
```json
{
  "read": {
    "StructureDefinition": true,
    "ValueSet": true,
    "CodeSystem": true
  },
  
}
```

Complex example
```json
{
  "read": {
    // Can read all ihris-practitioner profiled Practitioners only for fields: name, gender, birthDate
    "ihris-practitioner": [ "name", "gender", "birthDate" ],
    // Can read everything in Practitioner/1234
    "Practitioner/1234": true
  },
  "write": {
    "Practitioner/1234": true // write does not guarantee read
  }
}
```
