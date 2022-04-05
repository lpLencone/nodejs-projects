const Job = require('../models/Job')
const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
//
const getAllJobs = async (req, res) => {
  // find all jobs related to the user making the request and return the selected fields
  const allJobs = await Job.find({
    createdBy: req.user.userId
  })
    .select('company position status')
    .sort('createdAt')
  res
    .status(StatusCodes.OK)
    .json({ 'job count': allJobs.length, 'job list': allJobs })
}

const getJob = async (req, res) => {
  // get user id and job id
  const {
    user: { userId },
    params: { id: jobId }
  } = req
  // find single job using job id
  const job = await Job.findOne({
    createdBy: userId,
    _id: jobId
  }).select('-__v -createdBy')
  // verify whether the job exists
  if (!job) {
    throw new NotFoundError('No job with given id.')
  }
  // send back the requested job
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  // get request information and assign it to a job info object
  const newJobInfo = req.body
  // get userId and assign to createdBy property
  newJobInfo.createdBy = req.user.userId
  // create a Job document with the info
  const newJob = await Job.create(newJobInfo)
  // send successful CREATED response
  res.status(StatusCodes.CREATED).json({ newJob })
}

const deleteJob = async (req, res) => {
  // get user id and job id
  const {
    user: { userId },
    params: { id: jobId }
  } = req
  // find single job using job id and then delete it
  const deletedJob = await Job.findOneAndDelete({
    createdBy: userId,
    _id: jobId
  }).select('-__v -createdBy')
  // verify whether the job existed
  if (!deletedJob) {
    throw new NotFoundError('No job with given id.')
  }
  // send back the requested job
  res.status(StatusCodes.OK).json({ deletedJob: deletedJob })
}

const updateJob = async (req, res) => {
  // get user id and job id
  const {
    user: { userId },
    params: { id: jobId }
  } = req
  // get new info to update job
  const updateJobInfo = req.body
  // check whether info was given
  if (!updateJobInfo) {
    throw new BadRequestError('no info was given')
  }

  // find single job using job id and then update it
  const oldJobInfo = await Job.findOneAndUpdate(
    // filter
    { createdBy: userId, _id: jobId },
    // update info
    updateJobInfo,
    // options: run validators
    { runValidators: true }
  ).select('-__v -createdBy')
  // verify whether the job existed
  if (!oldJobInfo) {
    throw new NotFoundError('No job with given id.')
  }
  // get job with new info
  const updatedJobInfo = await Job.findOne({
    createdBy: userId,
    _id: jobId
  }).select('-__v -createdBy')
  // send back the requested job old and new info
  res.status(StatusCodes.OK).json({
    'job info before': oldJobInfo,
    'updated job info': updatedJobInfo
  })
}

//
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob
}
