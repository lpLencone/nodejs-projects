// importing Schema to set the documents' structure
const Task = require('../models/Task')

const asyncWrapper = require('../middleware/asyncWrapper')

// /api/v1/tasks
const getTasks = asyncWrapper(async (req, res) => {
  // find all documents
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  // create new Task instance with information provided by the client
  const task = await Task.create(req.body)
  console.log({ 'new created Task': task })
  res.status(201).json(task)
})

// /api/v1/tasks/:id
const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  // find single document
  const task = await Task.findOne({ _id: taskID })

  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskID}` })
  }

  console.log(`Task "${task.name}" was selected.`)
  res.status(200).json({ task })
  return task
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const deletedTask = await Task.findOneAndDelete({ _id: taskID })

  if (!deletedTask) {
    return res.status(404).json({ msg: `No task with id ${taskID}` })
  }

  console.log(`${deletedTask.name} was deleted`)
  res.status(204).json({ message: 'success' })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const originalTask = await Task.findOne({ _id: taskID })
  const newInfo = req.body
  const task = await Task.findOneAndUpdate(
    // condition parameter
    { _id: taskID },
    // update object parameter (comes directly from the client)
    newInfo,
    // options
    {
      // new: if true, return the updated document rather than the original one
      new: true,
      // runValidators: if true, make sure that the update comply with the validators set in the schema
      runValidators: true
    }
  )

  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskID}` })
  }

  console.log(
    `Task recently edited: "name:${originalTask.name}, completed:${originalTask.completed}" -> "name:${task.name}, completed:${task.completed}"`
  )

  res.status(200).json({
    'task id': taskID,
    'original task': originalTask,
    task
  })
})

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
}
