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
                        return  { ...user.data.user, token: user.data.token}
                    } else {
                        return null
                    }
                } catch(err) {
                    console.log(err)
                }
                
            }
        })
    ],
    session: {
        jwt: true
    },
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            user && (token.user = user);
            return Promise.resolve(token)   // ...here
        },
        session: async (session, user, sessionToken) => {
            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            //TODO: set session.user.image = user.user.avatar
            delete session.user.name
            session.token = 'Bearer ' + user.user.token;
            session.user.first_name = user.user.first_name
            session.user.last_name = user.user.last_name
            session.user.address = user.user.address
            session.user.state = user.user.state
            session.user.city = user.user.city
            session.user.phone = user.user.phone
            session.user.pincode = user.user.pincode
            session.date = user.user.createdAt
            
            return Promise.resolve(session)
        }
    },
    pages: {
        signIn: '/signin'
    }
}

export default (req, res) => NextAuth(req, res, options)