const winston = require('winston')

winston.add( new winston.transports.Console( {
  level: "error",
  silent: true,
  format: winston.format.prettyPrint(),
  colorize: true
} ) )
