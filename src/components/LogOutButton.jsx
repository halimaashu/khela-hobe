'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { redirect } from 'next/navigation';


const LogOutButton = () => {
    const handleLogOut=async()=>{
        await authClient.signOut();
        redirect("/")
        location.reload();
        
    }
    return (
        <div>
            <Button variant="outline" onClick={handleLogOut}>
                Log Out
            </Button>
        </div>
    );
};

export default LogOutButton;