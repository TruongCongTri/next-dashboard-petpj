"use client";
import React, { useState } from "react";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginFormSchema } from "@/commons/formValidation";
import { siteConfig } from "@/data/site";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/customize/password-input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { setCookie } from "cookies-next";
import { SiteConfig } from "../../data/site";

type Schema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // import state from AuthStore
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthentication = useAuthStore((state) => state.setAuthentication);
  const form = useForm<Schema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: Schema) {
    try {
      console.log(values);
      setIsLoading(true);

      // do a post call to the auth endpoint
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.getValues("username"),
          password: form.getValues("password"),
        }),
      });
      // console.log(res.json());

      // check if response was ok
      if (!res.ok) {
        console.log("Oops! Something is wrong.");
        toast.error("Oops! Fail to Login.");

        setIsLoading(false);
        return console.error(res);
      }
      // retrieve data from the response
      const data = await res.json();

      // check if we have data
      if (data) {
        setUser(data); // set data to our user state
        setAuthentication(true); // set our authentication state to true
        setCookie("token", data?.accessToken); // set token to the cookie

        router.push(`${siteConfig.dashboard}`); // redirect to home page
      }
      toast.success("Login success");
      setIsLoading(false);
      console.log("Success!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setIsLoading(false);
    }
    // setIsLoading(true);

    // const res = await fetch("https://dummyjson.com/auth/login", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username: form.getValues("username"),
    //     password: form.getValues("password"),
    //   }),
    // });

    // // check if response was ok
    // if (!res.ok) {
    //   console.log("Oops! Something is wrong.");
    //   toast.error("Oops! Something is wrong.");

    //   setIsLoading(false);
    //   return console.error(res);
    // }
    // // retrieve data from the response
    // const data = await res.json();

    // // check if we have data
    // if (data) {
    //   setUser(data); // set data to our user state
    //   setAuthentication(true); // set our authentication state to true
    //   setCookie("token", data?.accessToken); // set token to the cookie
    //   toast.success("Login success");
    //   setIsLoading(false);
    //   router.push(`${siteConfig.dashboard}`); // redirect to home page
    // }
  }

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
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Username</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="ex@gmail.com"
                          type="text"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href={siteConfig.authorization.forgotPassword}
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={!form.formState.isValid || isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-1">
                      <Loader2 className="animate-spin" />
                      Please wait...
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">Login</div>
                  )}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href={siteConfig.authorization.register}
              className="underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
