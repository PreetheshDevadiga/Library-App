import React from 'react'
import RegisterForm  from '../../../components/auth/register-form'
 import GoogleAuth from '../../../components/auth/google-auth'
const RegisterPage=()=>{
  return (
    <RegisterForm >
      <GoogleAuth />
    </RegisterForm>
    
  )
}

export default  RegisterPage ;
