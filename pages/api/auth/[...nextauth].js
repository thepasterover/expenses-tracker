import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Credentials({
            name: 'Custom Provider',
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
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