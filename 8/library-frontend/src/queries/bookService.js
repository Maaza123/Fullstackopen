import {gql} from '@apollo/client'

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title,
            published,
            author{
                name
                born
            },
            genres 
        }
    }
`
export const FILTERED_BOOKS = gql`
    query filtered($genre: String!){
        allBooks(genre: $genre){
            title
            published
        }
    }
`
export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!,
        $published: Int!,
        $author: String!,
        $genres: [String!]!, ) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres){
            title
            published
            genres
        }
    }
    
`