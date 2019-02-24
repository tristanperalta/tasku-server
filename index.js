const { ApolloServer, gql } = require('apollo-server')
const { taskRepo } = require('./datasource')
const dataSources = () => ({
  taskRepo
})

const typeDefs = gql`
  type Task {
    id: ID
    note: String
    doneAt: String
    createdAt: String
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(note: String): TaskResponse!
    deleteTask(taskId: ID!): TaskResponse!
  }

  interface Response {
    success: Boolean!
    message: String
  }

  type TaskResponse implements Response {
    success: Boolean!
    message: String
    task: Task
  }
`

const resolvers = {
  Query: {
    tasks: () => taskModel.getAllTasks()
  },

  Mutation: {
    createTask: async (_, { task }, { dataSources }) => {
      console.log(task)
      return await {
        success: true,
        message: 'Successfully add task',
        task: dataSources.taskRepo.createTask(task)
      }
    },

    deleteTask: async (_, { taskId }, { dataSources }) => {
      return {
        success: true,
        message: `Task ${taskId} has been deleted`,
        task: dataSources.taskRepo.deleteTask(taskId)
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
