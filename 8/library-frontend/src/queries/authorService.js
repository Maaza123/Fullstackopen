import { gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
    query{
        allAuthors{
            name
            born
            bookCount
        }
    }
`
export const SET_BIRTHAY = gql`
    mutation setBirthday(
        $name: String!,
        $setBornTo: Int!){
            editAuthor(
                name: $name,
                setBornTo: $setBornTo
            ){
                name
                born
                bookCount
            }
        }
`
