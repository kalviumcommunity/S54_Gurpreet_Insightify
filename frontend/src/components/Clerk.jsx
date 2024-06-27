import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser as useClerkUser } from "@clerk/clerk-react";
import axios from "axios";
import BasicUsage from './BasicUsage';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import Dashboard from './Dashboard';

const Clerk = () => {
  const { user: clerkUser } = useClerkUser();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const signIn = async () => {
      if (!clerkUser) return;

      try {
        // console.log(clerkUser);
        const userName = clerkUser.fullName ?? clerkUser.username;
        const userEmail = clerkUser.emailAddresses[0]?.emailAddress;
        const userdata = {
          userId: clerkUser.id,
          userName: userName,
          email: userEmail,
        };
        console.log(userdata);
        navigate("/dashboard")
        setUser(userdata);  
        await axios.post("http://localhost:6969/user/login", userdata);
      } catch (error) {
        console.log("Please sign in or check your network connection.");
      }
    };

    signIn();
  }, [clerkUser,setUser]);

  const handleSignOut = () => {
    setUser(null);  
  };

  console.log(clerkUser);
  return (
    <div>
      <>
        <SignedOut>
          <SignInButton>
            <BasicUsage />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl='/' onSignOut={handleSignOut} />
        </SignedIn>
        
      </>
    </div>
  );
};

export default Clerk;
