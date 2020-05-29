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

