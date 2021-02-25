'use strict'

const {
  addStudent,
  getSingleStudent,
  getStudents,
  updateSingleStudent,
  deleteStudent
} = require('../services/student.service')
const { getStatusCode } = require('../utils/statusCode')
const CONTROLLER_CONS = 'CMS_AC_'

const createStudent = async (req, res) => {
  try {
    const respose = await addStudent(req.body)
    res.status(201).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Student added successfully.',
      errors: null
    })
  } catch (error) {
    console.error('Error while adding student: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

const getAllStudents = async (req, res) => {
  try {
    const respose = await getStudents()
    res.status(200).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Got all students',
      errors: null
    })
  } catch (error) {
    console.error('Error while getting student: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

const getStudent = async (req, res) => {
  try {
    const id = req.params.id
    const respose = await getSingleStudent(id)
    res.status(200).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Got student successfully.',
      errors: null
    })
  } catch (error) {
    console.error('Error while geting student details: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id
    const respose = await updateSingleStudent(req.body, id)
    res.status(200).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Updated student details',
      errors: null
    })
  } catch (error) {
    console.error('Error while updating student details: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

const removeStudent = async (req, res) => {
  try {
    const id = req.params.id
    const respose = await deleteStudent(id)
    res.status(200).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Removed student details successfully',
      errors: null
    })
  } catch (error) {
    console.error('Error while delting student details: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  removeStudent
}
