const workflowTest = {
  process: ( req ) => {
    return new Promise( (resolve) => {
      resolve( {
        resourceType: "Bundle",
        type: "transaction",
        entry: [
          {
            resource: {
              resourceType: "Practitioner",
              id: "123"
            }
          }
        ]
      } )
    } )
  }
}
 
module.exports = workflowTest
