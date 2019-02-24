const knex = require('knex')
const dbConfig = require('./knexfile').development
const dbClient = knex(dbConfig)

class Task {
  constructor(dbClient) {
    this.client = dbClient
  }

  async getAllTasks() {
    return this.client.select('*').from('tasks')
  }
}


module.exports = {
  taskModel: new Task(dbClient)
}
