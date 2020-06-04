# POST INVALID
return 422 and OperationOutcome
# POST VALID
return 201 and Resource with ID and meta
also includes ETag and Location headers
# PUT INVALID
return 422 and OperationOutcome
# PUT SAME
return 200 and resource (no change to versionId or lastUpdated
include ETag and Content-Location header
# PUT UPDATE
return 200 and resource
include ETag and Content-Location header
# PUT UPDATE WITH WRONG ID
return 400 and OperationOutcome
# GET resource/id
return 200 with resource
include ETag and Content-Location headers
# GET resource/invalid id
return 404 and OperationOutcome
# GET resource?query
return 200 and Bundle (even if 0 found)
# DELETE resource/id
return 200 and OperationOutcome
# DELETE resource/invalid id
return 404 and OperationOutcome
