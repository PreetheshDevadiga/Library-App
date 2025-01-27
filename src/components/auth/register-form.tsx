'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from"../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import React from "react"
import {GoogleButton} from "../ui/googleButton"
import  {useActionState} from "react"
import {register, State} from "../../action/register"

const RegisterForm= (({children}:{children:React.ReactNode})=>{
  
  const initialState: State = { message: "", errors: {} };

  const [state, formAction] = useActionState(register,initialState);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Join us today!</CardTitle>
          <p className="text-center">Sign up now to become a member.</p>
        </CardHeader>
        <CardContent>
          <form action={formAction}> 
            <div className="space-y-2">
                <div className="flex flex-row gap-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="John Doe" required />
              </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone"  name="phone" placeholder="9087654321" required type="phone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email"placeholder="john@example.com" required type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password"required type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name ="confirmPassword" required type="password" />
              </div>
              
              <Button className="w-full rounded-md focus:outline-none focus:ring-2" type="submit">
                Sign Up
              </Button>
    
            </div>

          </form>
        </CardContent>
        <CardFooter className="justify-center">
            <div className="flex flex-col justify-center text-center gap-2">
            <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="px-2 bg-white text-gray-500 text-sm">Or continue with</span>
        <div className="flex-grow border-t border-gray-300" />
    </div>
    {children}
                <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="font-medium text-primary hover:underline" href="/login">
              Log in
            </Link>
          </p>
            </div>
          
        </CardFooter>
      </Card>
    </div>
  )
})

export default RegisterForm;