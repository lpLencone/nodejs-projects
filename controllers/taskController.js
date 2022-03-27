// /api/v1/tasks
function getTasks(req, res) {
  res.json({
    completed: true,
    taskID: 4,
    name: 'task1'
  })
}
function createTask(req, res) {
  /*
    const body = req.body
    res.json({body}) // { "body":{ "name":value } }
  */

  const { name } = req.body
  res.json({ name }) // { "name":value }
}

// /api/v1/tasks/:id
function getSingleTask(req, res) {
  res.json('get single')
}
function updateTask(req, res) {
  res.send('udpate task')
}
function deleteTask(req, res) {
  res.send('delet task')
}

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
}
