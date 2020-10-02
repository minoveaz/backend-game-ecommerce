import resolversProductsQuery from './products';
import resolversUserQuery from './user';
import GMR from 'graphql-merge-resolvers';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductsQuery
]);

export default queryResolvers;