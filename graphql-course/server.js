const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();

const authors = {
  1: {
    name: "J.K. Rowling",
  },
  2: {
    name: "J.R.R. Tolkien",
  },
};

const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    authorId: 1,
  },
  {
    id: 2,
    title: "Harry Potter and the Prisoner of Azkaban",
    authorId: 1,
  },
  {
    id: 3,
    title: "Harry Potter and the Goblet of Fire",
    authorId: 1,
  },
  {
    id: 4,
    title: "The Fellowship of the Ring",
    authorId: 2,
  },
  {
    id: 5,
    title: "The Two Towers",
    authorId: 2,
  },
  {
    id: 6,
    title: "The Return of the King",
    authorId: 2,
  },
];

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "HelloWorld",
//     fields: () => ({
//       message: {
//         type: GraphQLString,
//         resolve: () => "Hello World",
//       },
//       name: {
//         type: GraphQLString,
//         resolve: () => "rayest",
//       },
//     }),
//   }),
// });

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a Book written by an Author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors[book.authorId];
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an Author of a book",
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
    id: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: GraphQLString,
      description: "A single book",
      resolve: () => "Hello Book",
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of All Books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(GraphQLString),
      description: "List of All Authors",
      resolve: () => ["Hello Authors"],
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
