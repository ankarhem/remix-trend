require('dotenv').config();

module.exports = {
  overwrite: true,
  schema: {
    'https://storeapi.test.jetshop.io:': {
      headers: {
        shopid: 'demostore',
        token: process.env.STOREAPI_TOKEN,
      },
    },
  },
  documents: '{lib,app}/**/*.gql',
  generates: {
    'app/graphql/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: true,
      },
    },
  },
};
