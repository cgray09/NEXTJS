'use client'
import { Input, Button } from "@nextui-org/react"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { errorHelper } from "@/components/utils"
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function RegisterPage(){
    const [formType, setFormType] = useState(false);

    const formik = useFormik({
        initialValues:{ email:'',password:''},
        validationSchema: Yup.object({
            email:Yup.string()
            .email('This is not an email')
            .required('The email is required'),
            password:Yup.string()
            .required('The password is required ')
        }),
        onSubmit: async(values)=>{
            //// SUBMIT TO NEXT AUTH
            submitForm(values)
        }
    })


    const submitForm = async(values) => {
        if(formType){
            // REGISTER
            const res = await fetch('/api/register',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(values)
            });
            const user = await res.json();
            if(!res.ok) { alert(user.error)}
            else {
                signUser(values)
            }
        } else {
            // SIGN IN
            signUser(values)
        }
    }

    const signUser = async(values) => {
        await signIn('credentials',{
            email: values.email,
            password: values.password,
           // callbackUrl:'/dashboard'
            redirect: false,
        }).then((data)=>{
            if(data.ok){
                redirect('/dashboard')
            }
            console.log('Oops, try again later',data.error)

        })
    }


    return(
        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
            <h1 className="text-5xl py-10">
                {formType ?"Register":"Sign in"}
            </h1>

            <div className="mb-5">
                <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    fullWidth={true}
                    {...formik.getFieldProps('email')}
                    {...errorHelper(formik,'email')}
                />
            </div>

            <div className="mb-5">
                <Input
                    type="password"
                    label="Password"
                    variant="bordered"
                    fullWidth={true}
                    {...formik.getFieldProps('password')}
                    {...errorHelper(formik,'password')}
                />
            </div>



            <div className="mb-3">
                <Button color="secondary" type="submit">
                    { formType ?"Register":"Sign in"}
                </Button>
            </div>
            <div className="mb-3">
                <Button color="primary" variant="bordered" 
                onClick={()=>setFormType(!formType)}>
                    { formType ?
                        "Already registered ? Click here"
                    :
                        "Already signed in ? Click here"
                    }
                </Button>
            </div>

        </form>
    )
}