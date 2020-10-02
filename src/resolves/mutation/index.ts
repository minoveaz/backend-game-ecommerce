import resolversUserMutation from './user';

import GMR from 'graphql-merge-resolvers';
const mutationResolvers = GMR.merge([
    resolversUserMutation
]);

export default mutationResolvers;