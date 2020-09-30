import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema} from 'graphql';
import 'graphql-import-node';
import resolvers from './../resolves';


import {loadFilesSync} from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(`${__dirname}/**/*.graphql`);
const typeDefs = mergeTypeDefs(typesArray);


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers, 
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});

export default schema; 