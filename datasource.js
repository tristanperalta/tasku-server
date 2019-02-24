const knex = require('knex')
const dbConfig = require('./knexfile').development
const dbClient = knex(dbConfig)

class TaskRepo {
  constructor(dbClient) {
    this.client = dbClient
  }

  async getAllTasks() {
    return await this.client.select('*').from('tasks')
  }

  async getTaskById(id) {
    let task = await this.client.
      select('*').
      where({"id": id}).
      from('tasks').limit(1)

    return task[0]
  }

  async createTask(taskData) {
    let newTaskId = await this.client.
      returning(['id', 'note', 'createdAt']).
      insert(taskData).from('tasks')

    let task = await this.getTaskById(newTaskId)
    return task
  }

  async deleteTask(id) {
    let task = await this.getTaskById(id)
    await this.client.from('tasks').where({"id": id}).del()
    return task
  }
}

module.exports = {
  taskRepo: new TaskRepo(dbClient)
}
