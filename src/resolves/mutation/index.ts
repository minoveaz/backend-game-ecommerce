import resolversUserMutation from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationResolvers = GMR.Merge([
    resolversUserMutation
]);

export default mutationResolvers;