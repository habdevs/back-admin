import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://ahramickih:TOEToCA84ap9a69X@api-notes.rlncm4z.mongodb.net/?retryWrites=true&w=majority&appName=api-notes'
const port = process.env.PORT || 4000;

const client = new MongoClient(uri);

let notes = [
  {
    id: '1',
    content: 'This is a note',
    author: 'Bob Harley'
  },
  {
    id: '2',
    content: 'This is another note',
    author: 'Harlow Everly'
  },
  {
    id: '3',
    content: 'Oh hey look, another note!',
    author: 'Riley Harrison'
  }
];

async function startApolloServer() {
  const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }

  type Query {
    hello: String
		kek: String
    notes: [Note]
    note(id: ID): Note
  }

  type Mutation {
    newNote(content: String!, author: String!): Note
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
		kek: () => 'LOL kek',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: args.author 
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app, path: '/api' });

  await client.connect();

  app.listen({ port }, () =>
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
  );
}

startApolloServer().catch(error => console.error(error));