"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { setCookie } from "cookies-next";

export default function SigninForm() {
  const router = useRouter();
  const [userInfo] = useState({ email: "emilys", password: "emilyspass" });
  // import state from AuthStore
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthentication = useAuthStore((state) => state.setAuthentication);

  const login = async () => {
    // do a post call to the auth endpoint
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userInfo.email,
        password: userInfo.password,
      }),
    });

    // check if response was ok
    if (!res.ok) {
      return console.error(res);
    }
    // retrieve data from the response
    const data = await res.json();

    // check if we have data
    if (data) {
      setUser(data); // set data to our user state
      setAuthentication(true); // set our authentication state to true
      setCookie("token", data?.token); // set token to the cookie
      router.push("/"); // redirect to home page
    }
  };
  return (
    <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="title">
              <h2>Login</h2>
            </div>
            <div className="container form">
              <label>
                <b>Username</b>
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                name="uname"
                value={userInfo.email}
                onChange={(event) => (userInfo.email = event.target.value)}
                required
              />
              <label>
                <b>Password</b>
              </label>
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                value={userInfo.password}
                onChange={(event) => (userInfo.password = event.target.value)}
                name="psw"
                required
              />
              <button onClick={login} className="button">
                Login
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
