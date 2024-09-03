import { NavBar } from '../../components/dashboard/NavBar'
import React from 'react';
import {LogoutForm} from '../../components/auth/logout-form'

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
        <NavBar>
          <LogoutForm></LogoutForm>
          </NavBar>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </>
  );
}