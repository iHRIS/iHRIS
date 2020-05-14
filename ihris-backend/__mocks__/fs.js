'use strict'

const fs = jest.genMockFromModule('fs')

let fileContents = ""

function __setMockFile( newFileContents ) {
  fileContents = newFileContents
}

function readFileSync( file ) {
  return fileContents
}

fs.__setMockFile = __setMockFile
fs.readFileSync = readFileSync

module.exports = fs
