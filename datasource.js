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
    return await this.client.insert(taskData).from('tasks')
  }

  async deleteTask(id) {
    return await this.client.from('tasks').where({"id": id}).del()
  }
}

module.exports = {
  taskRepo: new TaskRepo(dbClient)
}
