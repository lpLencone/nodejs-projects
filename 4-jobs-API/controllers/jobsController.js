const User = require('../models/User')
//
const getAllJobs = async (req, res) => {
  res.status(200).json({ msg: 'getalljobs' })
}

const getJob = async (req, res) => {
  res.status(200).json({ msg: 'getJob' })
}

const createJob = async (req, res) => {
  res.status(200).json({ msg: 'createJob', user: req.user })
}

const deleteJob = async (req, res) => {
  res.status(200).json({ msg: 'deleteJob' })
}

const updateJob = async (req, res) => {
  res.status(200).json({ msg: 'updateJob' })
}

//
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob
}
