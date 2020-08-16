'use strict'

const fs = jest.genMockFromModule('fs')

let fileContents = ""

function __setMockFile( newFileContents ) {
  fileContents = newFileContents
}

function readFileSync( file ) {
  return fileContents
}
function existsSync( file ) {
  return true
}

fs.__setMockFile = __setMockFile
fs.readFileSync = readFileSync
fs.existsSync = existsSync

module.exports = fs
