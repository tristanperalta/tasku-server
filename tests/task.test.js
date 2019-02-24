const expect = require('chai').expect
const { taskRepo } = require('../datasource')

describe('Task', function() {
  describe('#getAllTasks', function() {
    it('pull all tasks', async function() {
      let tasks = await taskRepo.getAllTasks()
      expect(tasks).to.have.length(4)
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
})
