import React, { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";

const Clerk = () => {
  const {user} = useUser()
  useEffect(() => {
    const signIn = async () => {
      try {
        console.log(user);
        let userName = user.username == null ? user.fullName : user.username;
        let userEmail = user.emailAddresses[0].emailAddress;
        const userdata = {
          userId: user.id,
          userName: userName,
          email: userEmail,
        };
        console.log(userdata);
        await axios.post("http://localhost:6969/user/login", userdata);
      } catch (error) {
        console.log("Please sign in or check your network connection.");
      }
    };

    if (user) {
      signIn();
    }
  }, [user]);

  console.log(user)
  return (
    <div>
        <>
      <SignedOut>
      <SignInButton >
        <button style={{
          width:"8vmax",
          color:"white",
          fontSize:"1.3vmax",
          backgroundColor:"black",
          padding:"0.6vmax",
          outline:"none",
          borderRadius:"10px",
          border:"none"
        }}
        >Sign in</button>
      </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
    </div>
  )
}

export default Clerk