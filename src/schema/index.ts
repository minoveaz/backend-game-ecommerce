import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema} from 'graphql';
import 'graphql-import-node'
import typeDefs from './schema.graphql';
import resolvers from './../resolves';


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema; 