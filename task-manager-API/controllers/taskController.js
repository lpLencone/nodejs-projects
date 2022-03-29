// importing Schema to set the documents' structure
const Task = require('../models/Task')

// /api/v1/tasks
async function getTasks(req, res) {
  try {
    // find all documents
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}

async function createTask(req, res) {
  try {
    const task = await Task.create(req.body)
    console.log({ 'new created Task': task })
    res.status(201).json(task)
  } catch (error) {
    // get error message
    const errorMessage = error
    // format user friendly
    const errorString = `Your request returned an error: "${errorMessage}"`
    console.log(errorString)
    res.status(500).send(errorString)
  }
}

// /api/v1/tasks/:id
async function getSingleTask(req, res) {
  try {
    const { id: taskID } = req.params
    // find single document
    const task = await Task.findOne({ _id: taskID })
    console.log(`Task "${task.name}" was selected.`)

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` })
    }

    res.status(200).json({ task })
    return task
  } catch (error) {
    // get error message
    const errorMessage = error
    // format user friendly
    const errorString = `Your request returned an error: "${errorMessage}"`
    console.log(errorString)
    res.status(500).send(errorString)
  }
}

async function deleteTask(req, res) {
  try {
    const { id: taskID } = req.params
    const deletedTask = await Task.findOneAndDelete({ _id: taskID })

    if (!deletedTask) {
      return res.status(404).json({ msg: `No task with id ${taskID}` })
    }

    console.log(`${deletedTask.name} was deleted`)
    res.status(204).json({ message: 'success' })

    // to see on the postman
    // res.status(200).json(deletedTask)
  } catch (error) {
    const errorMessage = error
    const errorString = `Your request returned an error: "${errorMessage}"`
    console.log(errorString)
    res.status(500).send(errorString)
  }
}

async function updateTask(req, res) {
  try {
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
      'old info': {
        name: originalTask.name,
        completed: originalTask.completed
      },
      'updated info': newInfo
    })
  } catch (error) {
    const errorMessage = error
    const errorString = `Your request returned an error: "${errorMessage}"`
    console.log(errorString)
    res.status(500).send(errorString)
  }
}

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  // temp
  editTask
}
