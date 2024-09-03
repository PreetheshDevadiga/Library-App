
'use server';
 
import { auth, signIn } from '../auth';
import { AuthError } from 'next-auth';
import {LoginSchema} from '../schemas/index'
import {redirect} from 'next/navigation';


type LoginResult = { error: string } | { user: LoginSchema }| string | undefined;

export default async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
        console.log(formData)
     const result = await signIn("credentials", formData);
     console.log("result",result)
     if(result){
      redirect('/dashboard')
     }
      console.log("Success");
    } catch (error) {
      console.log("failure to sign in",error)

      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return "Invalid credentials.";
          default:
            return "Something went wrong.";
        }
      }
    }
  }
  