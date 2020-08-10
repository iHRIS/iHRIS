# $short-name endpoint

## Access
Any read access will give access to the $short-name.  

__Should this be denied if not full access?__

## Endpoints

* /$short-name?code=X&system=X[&valueset=X]
* /$short-name?reference=X

Should these be supported?

* /Resource/id/$short-name
* /CodeSystem/id/$short-name?code=X[&valueset=X]
* /ValueSet/id/$short-name?code=X&system=X
* /Resource/$short-name?\_id=X
* /CodeSystem/$short-name?code=X&system=X[&valueset=X]
* /ValueSet/$short-name?code=X&system=X&valueset=X
