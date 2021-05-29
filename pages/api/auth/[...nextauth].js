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
            delete session.user.name
            session.token = 'Bearer ' + user.user.token;
            session.user = {...session.user,
                first_name: user.user.first_name,
                last_name: user.user.last_name,
                address: user.user.address,
                city: user.user.city,
                state: user.user.state,
                phone: user.user.phone,
                pincode: user.user.pincode,
                date: user.user.createdAt,
                avatar: user.user.avatar
            }
            return Promise.resolve(session)
        }
    },
    pages: {
        signIn: '/signin'
    }
}

export default (req, res) => NextAuth(req, res, options)