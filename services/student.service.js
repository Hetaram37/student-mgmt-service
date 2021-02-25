'use strict'
const {
  createOne,
  updateOne,
  find,
  findOne,
  findById
} = require('../repository/commonRepository')
const Student = require('../model/students')
const Joi = require('joi')
const SERVICE_CON = 'SMS_S_S_'
const AppError = require('../utils/appError')
const AddSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .max(25)
    .required(),
  last_name: Joi.string()
    .min(2)
    .max(25)
    .required(),
  email: Joi.string()
    .min(2)
    .max(250)
    .email()
    .required()
})

const updateSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .max(25)
    .required(),
  last_name: Joi.string()
    .min(2)
    .max(25)
    .required(),
  email: Joi.string()
    .min(2)
    .max(250)
    .email()
    .required(),
  fees: Joi.number().strict()
    .min(1000)
    .max(8000)
    .allow(null),
  class: Joi.number().strict()
    .min(1)
    .max(12)
    .allow(null)
})

const addStudent = async (student) => {
  console.log('addStudent() student: %j', student)
  await validateStudentInput(student, AddSchema)
  await isExist(student.email)
  const newStudent = await createOne(student, Student)
  console.log('Newly added student: %j', newStudent)
  return newStudent
}

async function isExist (email) {
  const student = await findOne({ email, is_deleted: false }, { _id: 1 }, Student)
  if (student) {
    throw new AppError(null, SERVICE_CON + 400, 'Student already exist with this email', 'Student already exist with this email')
  }
}

async function validateStudentInput (body, schema) {
  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw new AppError(null, SERVICE_CON + 206, 'Partial content', error)
  }
}

const updateSingleStudent = async (student, id) => {
  console.log('updateStudent() student: %j, id: %s', student, id)
  await validateStudentInput(student, updateSchema)
  const updatedData = await updateOne({ _id: id, email: student.email }, student, studentProjection(), Student)
  console.log('Data after updating student: %j', updatedData)
  return updatedData
}

const getStudents = async () => {
  console.log('getStudents()')
  const students = await find({
    is_deleted: false
  }, studentProjection(), Student)
  return students
}

function studentProjection () {
  return {
    first_name: true,
    email: true,
    last_name: true,
    class: true,
    fees: true
  }
}

const getSingleStudent = async (id) => {
  console.log('getSingleStudent() id: %s', id)
  const student = await findById(id, singleStudentProjection(), Student)
  return student
}

function singleStudentProjection () {
  return {
    first_name: true,
    last_name: true,
    email: true,
    class: true,
    fees: true
  }
}

const deleteStudent = async (id) => {
  console.log('deleteStudent() id: %s', id)
  const updatedData = await updateOne({ _id: id }, { is_deleted: true }, {}, Student)
  console.log('Data after deleting student: %j', updatedData)
  return updatedData
}

module.exports = {
  addStudent,
  updateSingleStudent,
  getStudents,
  getSingleStudent,
  deleteStudent
}
