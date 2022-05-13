const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./models/book.js')
const Author = require('./models/authors.js')
const User = require('./models/user.js')
const jwt = require('jsonwebtoken')


require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex:true})
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(error => console.log(error.message))
console.log('connecting to ', MONGODB_URI)


const typeDefs = gql`
  type Author {
    name: String!,
    id: ID!,
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User!
  }
  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String!]! 
    ):Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.find({}).countDocuments(),
      authorCount: () => Author.find({}).countDocuments(),
      me: (root, args, context) => {
        return context.currentUser
      },
      allBooks: async (root, args) => {
        let returnedBooks = await Book.find({}).populate('author');
        if(args.author){
          returnedBooks = returnedBooks.filter(b => b.author === args.author)
        }
        if(args.genre){
          returnedBooks = returnedBooks.filter((b)=> {
            if(b.genres.indexOf(args.genre) !== -1){
              return true
            }
          })
        }
        return returnedBooks
        
      },
      allAuthors: () => Author.find({})
     
  },
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({}).exec()
      console.log(result)
      console.log(root.id)
      
      return result.filter(b=>String(b.author) === String(root.id)).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) =>{
      try{
        const currentUser = context.currentUser;
        if(!currentUser){
          throw new AuthenticationError('not authenticated')
        }
        console.log(args)
        let result = await Author.findOne({name: args.author}).exec()
        if(result === null){
          const author = new Author({
            name: args.author,
            born: null
            })
            result = await author.save()
            const book = new Book({
              title: args.title,
              published: args.published,
              author: result,
              genres: args.genres
            })
            return await book.save()
        }else{
          const book = new Book({
            title: args.title,
            published: args.published,
            author: result,
            genres: args.genres
          })
        return await book.save()
      }
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs: args,
        })
      }
      
    },
    addAuthor: (root, args) => {
      
      const author = new Author({...args})
      return author.save({...args})
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }

      try{
        return await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo}, {new:true}).exec()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
    },
    createUser: async(root, args) => {
      try{
        const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
        return await user.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if (!user || args.password !== 'Secret'){
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: `bearer ${jwt.sign(userForToken, JWT_SECRET)}`}
    }
    
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})