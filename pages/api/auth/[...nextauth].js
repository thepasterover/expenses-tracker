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
                        return  { token: user.data}
                    } 
                } catch(err) {
                    if(err.response){
                        throw new Error(err.response.data.error)
                    }
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
            //  token.user.token HASS token
            // console.log(token.user.token) 
            user && (token.user = user);
            return token   // ...here
        },
        session: async (session, user, sessionToken) => {
            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            delete session.user.name
            delete session.user.image
            session.token = 'Bearer ' + user.user.token;
            let userMe
            if(user.user?.token){
                const res = await axiosInstance.get('/auth/user/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.user.token,
                    }
                })
                userMe = res.data
                session.user = {...session.user,
                    email: userMe.email,
                    first_name: userMe.first_name,
                    last_name: userMe.last_name,
                    address: userMe?.address,
                    city: userMe?.city,
                    state: userMe?.state,
                    phone: userMe?.phone,
                    pincode: userMe?.pincode,
                    date: userMe?.createdAt,
                    avatar: userMe?.avatar
                }
            } 
            
            return session
        }
    },
    pages: {
        signIn: '/signin'
    }
}

export default (req, res) => NextAuth(req, res, options)