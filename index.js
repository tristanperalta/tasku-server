const { ApolloServer, gql } = require('apollo-server')
const { taskModel } = require('./datasource')
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
      return {
        success: true,
        message: 'Successfully add task',
        task: tasks[0]
      }
    },

    deleteTask: async (_, { taskId }, { dataSources }) => {
      return {
        success: true,
        message: `Task ${taskId} has been deleted`,
        task: tasks[1]
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
