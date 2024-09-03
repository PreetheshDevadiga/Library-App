import React from 'react'
import { LoginForm } from '../../../components/auth/login-form'
import GoogleAuth from '../../../components/auth/google-auth'


const LoginPage=()=>{
  return (
    <LoginForm>
      <GoogleAuth />
    </LoginForm>
    
  )
}

export default  LoginPage ;
