import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-900 selection:bg-primary-200 selection:text-primary-900">
      <Navbar />
      <main className="flex-grow pt-16 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};