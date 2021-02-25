'use strict'

const studentRoute = require('./student.route')

module.exports = (app) => {
  app.use('/api/student', studentRoute)
}
