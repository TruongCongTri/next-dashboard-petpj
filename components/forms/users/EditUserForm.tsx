"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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

import {
  userProfileFormSchema,
} from "@/commons/shopFormValidation";
import { Loader2, Plus } from "lucide-react";
import { siteConfig } from "../../../data/site";
import { IUserType } from "@/models/dummyType";
import { useParams, useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Schema = z.infer<typeof userProfileFormSchema>;

export default function ViewUserForm() {
  const router = useRouter();
  const param = useParams();
  const [user, setUser] = useState<IUserType>();
  const [isLoading, setIsLoading] = useState(true);
  //   const [isCateLoading, setIsCateLoading] = useState(true);
  //   const [cateNameList, setCateNameList] = useState<string[]>();
  //   const [tags, setTags] = React.useState<string[]>([]);

  //   const [warrantiesList, setWarrantiesList] = useState<string[]>(warranties);
  //   const [returnList, setReturnList] = useState<string[]>(returnPolicies);
  //   const [shippingList, setShippingList] = useState<string[]>(shippingTimes);
  //   console.log(cateNameList);
  //   console.log(warrantiesList);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${param.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setUser(data);
      //   setTags(data.tags);
      setIsLoading(false);
    };
    fetchUser();
    // fetchCates();
  }, [param]);

  const defaultValues: Partial<Schema> = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    maidenName: "",

    image: "",

    age: 0,
    birthDate: "",
    gender: "",
  };

  const values: Schema = {
    username: user?.username || "",
    email: user?.email || "",
    firstName: user?.firstName,
    lastName: user?.lastName,
    maidenName: user?.maidenName,

    image: user?.image,

    age: user?.age,
    birthDate: user?.birthDate.toString(),
    gender: user?.gender,
  };

  const form = useForm<Schema>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues,
    mode: "onChange",
    values,
  });

  async function onSubmit() {
    try {
      router.push(`${siteConfig.shop.product}/${param.id}/edit`);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to assess editing page. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full w-full items-center justify-center ">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full basis gap-4">
            <Card className="basis-3/4">
              <CardHeader>
                <VisuallyHidden>
                  <CardTitle className="text-xl">General Information</CardTitle>
                </VisuallyHidden>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="title">Image</FormLabel>
                        </VisuallyHidden>
                        <FormControl>
                          <Image
                            id="image"
                            width="150"
                            height="150"
                            src={`${
                              field.value
                                ? field.value
                                : "/images/placeholder.svg"
                            }`}
                            alt={`${
                              field.value
                                ? field.value
                                : "/images/placeholder.svg"
                            }`}
                            className="rounded-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="description">Username</FormLabel>
                        </VisuallyHidden>

                        <FormControl>
                          {/* <Input
                            id="description"
                            placeholder="Type description here. . ."
                            autoComplete="description"
                            type="text"
                            disabled={true}
                            {...field}
                          /> */}
                          <div className="capitalize">{field.value}</div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="email">email</FormLabel>
                        </VisuallyHidden>
                        <FormControl>
                          {/* <Input
                            id="email"
                            placeholder="Type email here. . ."
                            autoComplete="email"
                            type="text"
                            disabled={true}
                            {...field}
                          /> */}
                          <div>{field.value}</div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                      <Plus /> Edit Product
                    </div>
                  )}
                </Button>
                <Separator />
                <div>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                        </VisuallyHidden>
                        <FormControl>
                          {/* <Input
                            id="description"
                            placeholder="Type description here. . ."
                            autoComplete="description"
                            type="text"
                            disabled={true}
                            {...field}
                          /> */}
                          <div>{field.value}</div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isLoading ? (
                    <Skeleton className="h-12 w-12 rounded-full" />
                  ) : (
                    <div>{user?.firstName}</div>
                  )}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        </VisuallyHidden>
                        <FormControl>
                          {/* <Input
                            id="lastName"
                            placeholder="Type description here. . ."
                            autoComplete="description"
                            type="text"
                            disabled={true}
                            {...field}
                          /> */}
                          <div>{field.value}</div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maidenName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="maidenName">
                            Maiden Name
                          </FormLabel>
                        </VisuallyHidden>
                        <FormControl>
                          {/* <Input
                            id="maidenName"
                            placeholder="Type maidenName here. . ."
                            autoComplete="maidenName"
                            type="text"
                            disabled={true}
                            {...field}
                          /> */}
                          <div>{field.value}</div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="gender">gender</FormLabel>
                        </VisuallyHidden>
                        <FormControl>
                          {/* <Input
                            id="gender"
                            placeholder="Type maidenName here. . ."
                            autoComplete="gender"
                            type="text"
                            disabled={true}
                            {...field}
                          /> */}
                          <div>{field.value}</div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <VisuallyHidden>
                          <FormLabel htmlFor="age">age</FormLabel>
                        </VisuallyHidden>
                        <FormControl>
                          {/* <Input
                          id="age"
                          placeholder="Type age here. . ."
                          autoComplete="age"
                          type="number"
                          disabled={true}
                          {...field}
                        /> */}
                          <div>{field.value}</div>
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
