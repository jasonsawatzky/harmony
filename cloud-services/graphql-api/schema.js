import user from './user'
import { mergeSchemas } from 'graphql-tools'

export default mergeSchemas({
    schemas: [user.schema],
    resolvers: {
        Query: {
            ...user.resolvers.Query
        },
        Mutation: {
          ...user.resolvers.Mutation
        }
    },
})
