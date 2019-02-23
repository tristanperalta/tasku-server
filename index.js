const { ApolloServer, gql } = require('apollo-server')
const { tasks } = require('./datasource')

const typeDefs = gql`
  type Task {
    id: ID
    note: String
    date: String
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(note: String): TaskResponse!
    deleteTask(taskId: ID!): TaskResponse!
  }

  type TaskResponse {
    success: Boolean!
    message: String
    task: Task
  }
`

const resolvers = {
  Query: {
    tasks: () => tasks
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
