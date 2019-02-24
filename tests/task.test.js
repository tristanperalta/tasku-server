const expect = require('chai').expect
const { taskRepo } = require('../datasource')

describe('Task', function() {
  describe('#getAllTasks', function() {
    it('pull all tasks', async function() {
      let tasks = await taskRepo.getAllTasks()
      expect(tasks).not.to.be.empty
    })
  })

  describe('#getTaskById', function() {
    it('return a task given by id', async function() {
      let task = await taskRepo.getTaskById(1)
      expect(task).to.have.property('note')
    })

    it('return task with the same id', async function() {
      let taskId = 2
      let task = await taskRepo.getTaskById(taskId)
      expect(task.id).to.eq(taskId)
    })
  })

  describe('#addTask', function() {
    it('adds task', async function() {
      let taskData = { note: 'new task' }
      let task = await taskRepo.addTask(taskData)
    })
  })

  describe('#removeTask', function() {
    it('adds task', async function() {
      let taskData = { note: 'new task' }
      let task = await taskRepo.addTask(taskData)
      await taskRepo.removeTask(4)
    })
  })
})
