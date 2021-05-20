import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { axiosInstance } from '../../../axios'

const options = {
    providers: [
        Providers.Credentials({
            name: 'Custom Provider',
            async authorize({email, password}) {
                try{
                    const user = await axiosInstance.post('/auth/signin', {
                        email,
                        password
                    })
                    if(user.data) {
                        return user.data
                    } else {
                        return null
                    }
                } catch(err) {
                    console.log(err)
                }
                
            }
        })
    ],
    pages: {
        signIn: '/signin'
    }
}

export default (req, res) => NextAuth(req, res, options)