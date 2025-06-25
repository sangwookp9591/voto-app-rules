'use client';
import { SessionProvider } from 'next-auth/react';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientRoot({ session, children }: { session: any; children: React.ReactNode }) {
    return (
        <SessionProvider session={session}>
            <Navbar />
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
            <main className="flex-1 px-4 py-6 md:px-8 md:py-10 max-w-5xl w-full mx-auto">{children}</main>
        </SessionProvider>
    );
}
