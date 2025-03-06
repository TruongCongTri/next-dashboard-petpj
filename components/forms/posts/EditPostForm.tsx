"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { IPostType } from "@/models/dummyType";

type Schema = z.infer<typeof postFormSchema>;

export default function EditPostForm() {
  const router = useRouter();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<IPostType>();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/posts/${param.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setPost(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const defaultValues: Partial<Schema> = {
    title: "",
    body: "",
    userId: 0,
  };

  const values: Partial<Schema> = {
    title: post?.title,
    body: post?.body,
    userId: post?.userId,
  };

  const form = useForm<Schema>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: "onChange",
    values,
  });

  async function onSubmit(values: Schema) {
    try {
      console.log(values);
      setIsLoading(true);

      const res = await fetch(`https://dummyjson.com/posts/${post?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: form.getValues("title"),
          body: form.getValues("body"),
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
      {/* <Button
        variant="secondary"
        onClick={() => router.push(`${siteConfig.info.post}`)}
      >
        <X style={{ transform: "rotate(270deg)" }} /> Cancel
      </Button> */}
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2 justify-end items-end">
            <Button variant="secondary">
              <Link
                href={`${siteConfig.info.post}/${post?.id}`}
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
                  <Plus /> Edit Post
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
                            className="bg-muted"
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
                            rows={10}
                            className="bg-muted"
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
                            className="bg-muted"
                            disabled={true}
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
