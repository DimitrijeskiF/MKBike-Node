require('dotenv').config();
require('./db/mongoose')
const server = require('./server')

module.exports = server
