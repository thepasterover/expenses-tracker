import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Credentials({
            name: 'Custom Provider',
            async authorize(credentials) {
                const user = { name: 'JOHN', email: 'johndoe@gmail.com'}
                return user
            }
        })
    ],
    pages: {
        signIn: '/signin'
    }
}

export default (req, res) => NextAuth(req, res, options)