"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { categoryFormSchema } from "@/commons/shopFormValidation";
import { Loader2, Plus, X } from "lucide-react";
import { siteConfig } from "../../../data/site";
import Link from "next/link";

export default function CategoryForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      slug: "",
      name: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    try {
      console.log(values);
      setIsLoading(true);
      setTimeout(
        () => (
          setIsLoading(false),
          toast.success(
            <pre className="mr-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(values, null, 2)}
              </code>
            </pre>
          )
        ),
        1000
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="h-full w-full items-center justify-center px-4">
      <Button variant="secondary" onClick={() => (router.push(`${siteConfig.shop.category}`))}>
          <X style={{ transform: "rotate(270deg)" }} /> Cancel
      </Button>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2 justify-end items-end">
            <Button variant="secondary">
              <Link href={siteConfig.shop.category}>
                <X style={{ transform: "rotate(270deg)" }} /> Cancel
              </Link>
            </Button>
            {form.getValues("name") !== "" &&
            form.getValues("slug") !== "" &&
            form.getValues("url") !== "" ? (
              <>
                {!isLoading ? (
                  <Button type="submit">
                    <Plus /> Add Category
                  </Button>
                ) : (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </Button>
                )}
              </>
            ) : (
              <Button disabled>
                <Plus /> Add Category
              </Button>
            )}
          </div>
          <div className="flex w-full basis gap-2">
            <Card className="basis-1/4">
              <CardHeader>
                <CardTitle className="text-xl">Thumbnail</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="image">Image</FormLabel>
                      <FormControl>
                        <Input
                          id="image"
                          placeholder="Add category image url here. . ."
                          type="text"
                          autoComplete="image"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="basis-3/4">
              <CardHeader>
                <CardTitle className="text-xl">General Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="name">Category Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Type category name here. . ."
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
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="slug">Slug</FormLabel>

                        <FormControl>
                          <Input
                            id="slug"
                            placeholder="Type category slug here. . ."
                            type="text"
                            autoComplete="slug"
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
