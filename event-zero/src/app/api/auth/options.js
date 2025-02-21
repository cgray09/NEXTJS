import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import DBconnect from "@/lib/db";
import User from "@/lib/models/user";
import { passwordCheck } from "@/components/utils";

export const options = {
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"Enter your email"
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"Enter your password"
                }
            },
            async authorize(credentials){
                /// CONNECT DB
                await DBconnect()

                /// USER EXISTS ?
                const user = await User.findOne({email:credentials.email})
                if(!user){
                    return null
                }

                /// VALID PASS ?
                const validPass = await passwordCheck(credentials.password,user.password);
                if(!validPass){
                    return null
                }

                return user;
            }
        })
    ],
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    },
    pages:{
        signIn:'/register'
    }
}