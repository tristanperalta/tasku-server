const knex = require('knex')
const dbConfig = require('./knexfile').development
const dbClient = knex(dbConfig)

class Task {
  constructor(dbClient) {
    this.client = dbClient
  }

  getAllTasks() {
    return [
      { id: 1,
        note: 'Going to work',
        createdAt: (new Date(2019, 1, 1)).toISOString()
      },
      { id: 2,
        note: 'Buy food',
        createdAt: (new Date(2019, 1, 2)).toISOString()
      },
      { id: 3,
        note: 'Cook',
        createdAt: (new Date(2019, 1, 3)).toISOString()
      },
      { id: 4,
        note: 'Workout',
        createdAt: (new Date(2019, 2, 1)).toISOString()
      }
    ]
  }
}


module.exports = {
  taskModel: new Task(dbClient)
}
