# Notes on Task Resolution

Code needs to determine if someone has permission (read/write/etc.) on a resource.

hasPermission( READ, RESOURCE, INSTANCE )


look up in FHIR server based on roles assigned to the person.

read, Practitioner, abc

is approved by having any of (broadest to most specific):

user/\*.\*
user/\*.read
user/Practitioner.\*
user/Practitioner.read
user/Practitioner/abc.\*
user/Practitioner/abc.read

stored separately for faster lookup?

scope, resource, instance, permission?



