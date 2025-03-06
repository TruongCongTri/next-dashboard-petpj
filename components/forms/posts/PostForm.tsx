"use client";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { postFormSchema } from "@/commons/shopFormValidation";
import { Loader2, Plus, X } from "lucide-react";
import { siteConfig } from "../../../data/site";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function PostForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    try {
      console.log(values);
      setIsLoading(true);

      const res = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        body: JSON.stringify({
          title: form.getValues("title"),
          userId: form.getValues("userId"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        console.log("Success!");
        toast.success(
          <pre className="mr-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        );

        setIsLoading(false);
      } else {
        console.log("Oops! Something is wrong.");
        toast.error(
          <pre className="mr-2 w-[340px] rounded-md bg-slate-950 p-4">
            Oops! Something is wrong.
          </pre>
        );

        setIsLoading(false);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full w-full items-center justify-center px-4">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2 justify-end items-end">
            <Button variant="secondary">
              <Link
                href={siteConfig.info.post}
                className="flex gap-1 items-center"
              >
                <X style={{ transform: "rotate(270deg)" }} /> Cancel
              </Link>
            </Button>
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
                <div className="flex items-center gap-1">
                  <Plus /> Add Post
                </div>
              )}
            </Button>
          </div>
          <div className="flex w-full basis gap-2">
            <Card className="basis-3/4">
              <CardHeader>
                <CardTitle className="text-xl">General Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="title">Post Title</FormLabel>
                        <FormControl>
                          <Input
                            id="title"
                            placeholder="Type Post Title here. . ."
                            type="text"
                            autoComplete="name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="body">Post Body</FormLabel>

                        <FormControl>
                          <Textarea
                            id="body"
                            placeholder="Type Post Body here. . ."
                            autoComplete="body"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="userId">Post user id</FormLabel>

                        <FormControl>
                          <Input
                            id="userId"
                            placeholder="Type User id here. . ."
                            autoComplete="id"
                            type="number"     
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
