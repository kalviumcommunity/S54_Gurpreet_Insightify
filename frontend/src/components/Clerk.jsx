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
        const userName = clerkUser.fullName ?? clerkUser.username;
        const userEmail = clerkUser.emailAddresses[0]?.emailAddress;
        const userdata = {
          userId: clerkUser.id,
          userName: userName,
          email: userEmail,
        };
        console.log("User data before login:", userdata);

        const response = await axios.post("http://localhost:6969/user/login", userdata);
        console.log("Response from login:", response.data);
        const { mongoUserId, token } = response.data;

        const updatedUserdata = {
          ...userdata,
          userId: mongoUserId, // Update userId with MongoDB _id
        };

        // Store the token in localStorage
        localStorage.setItem('token', token);

        console.log("Updated user data:", updatedUserdata);
        navigate("/dashboard");
        setUser(updatedUserdata);
      } catch (error) {
        console.log("Please sign in or check your network connection.");
      }
    };

    signIn();
  }, [clerkUser, setUser]);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove the token from localStorage on sign out
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