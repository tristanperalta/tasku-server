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
    tasks: () => taskRepo.getAllTasks()
  },

  Mutation: {
    createTask: async (_, taskParams, { dataSources }) => {
      try {
        let task = await dataSources.taskRepo.createTask(taskParams)
        return {
          success: true,
          message: 'Successfully add task',
          task: task
        }
      } catch {
        return {
          success: false,
          message: `There was an error adding a new task`
        }
      }
    },

    deleteTask: async (_, { taskId }, { dataSources }) => {
      try {
        let task = await dataSources.taskRepo.deleteTask(taskId)
        return {
          success: true,
          message: `Task ${taskId} has been deleted`,
          task: task }
      } catch {
        return {
          success: false,
          message: `Task ${taskId} failed to be deleted`
        }
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
