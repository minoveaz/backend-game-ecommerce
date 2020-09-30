import resolversProductsQuery from './products';
import resolversUserQuery from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const queryResolvers = GMR.Merge([
    resolversUserQuery,
    resolversProductsQuery
]);

export default queryResolvers;