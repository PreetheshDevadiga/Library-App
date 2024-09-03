"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useActionState } from 'react';
import authenticate from '@/action/login';

export const LoginForm = ({children}:{children:React.ReactNode}) => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full flex justify-center py-20">
        <Card className="w-full max-w-md border rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Log in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                
                <Button className="w-full rounded-md  focus:outline-none" type="submit">
                  Sign In
                </Button>
                  <Link className="text-sm font-medium  text-primary underline-offset-4 transition-colors hover:underline" href="#">
                    Forgot password?
                  </Link>
                  
              </div>

              <div className="text-sm text-muted-foreground mt-3">
                <span className="mr-1 hidden sm:inline-block">Dont have an account?</span>
                <Link className="text-primary underline-offset-4 transition-colors hover:underline" href="/signup">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="bg-white text-gray-500 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>
            {children}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
