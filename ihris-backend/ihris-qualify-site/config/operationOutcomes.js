module.exports = { 
  DENIED: {
    resourceType: "OperationOutcome",
    issue: [
      {
        severity: "error",
        code: "forbidden",
        diagnostics: "Access Denied"
      }
    ]
  },
  NOTLOGGEDIN: {
    resourceType: "OperationOutcome",
    issue: [
      {
        severity: "error",
        code: "forbidden",
        diagnostics: "Not logged in"
      }
    ]
  },
  ERROR: {
    resourceType: "OperationOutcome",
    issue: [
      {
        severity: "error",
        code: "exception",
        diagnostics: ""
      }
    ]
  }
}
