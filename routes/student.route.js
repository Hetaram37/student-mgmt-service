const route = require('express').Router()
const {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  removeStudent
} = require('../controllers/student.controller')

route.post('/v1', createStudent)
route.get('/v1', getAllStudents)
route.get('/v1/:id', getStudent)
route.put('/v1/:id', updateStudent)
route.delete('/v1/:id', removeStudent)

module.exports = route
