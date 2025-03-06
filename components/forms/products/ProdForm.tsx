"use client";
import React, { useEffect, useState } from "react";

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
import { productFormSchema } from "@/commons/shopFormValidation";
import { Loader2, Plus, X } from "lucide-react";
import { siteConfig } from "../../../data/site";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/ui/customize/tag-input";

import {
  warranties,
  returnPolicies,
  shippingTimes,
  availabilityStatus,
} from "../../../data/prodConstants";
import { Badge } from "@/components/ui/badge";
import { ICategoryType } from "@/models/dummyType";

export default function ProdForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [isCateLoading, setIsCateLoading] = useState(true);
  const [cateNameList, setCateNameList] = useState<string[]>();
  const [tags, setTags] = React.useState<string[]>([]);

  const [warrantiesList] = useState<string[]>(warranties);
  const [returnList] = useState<string[]>(returnPolicies);
  const [shippingList] = useState<string[]>(shippingTimes);

  useEffect(() => {
    const fetchCates = async () => {
      const res = await fetch(`https://dummyjson.com/products/categories`, {
        method: "GET",
      });
      const data = await res.json();
      // setCateList(data);
      setCateNameList(() =>
        data.map((o: ICategoryType) => o.name.toLowerCase())
      );
      setIsCateLoading(false);
    };

    fetchCates();
  }, []);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      brand: "",
      sku: "",

      thumbnail: "",
      // images: [""],
      weight: 0,
      width: 0,
      height: 0,
      depth: 0,
      tags: [""],
      warrantyInformation: "",
      shippingInformation: "",
      returnPolicy: "",
      availabilityStatus: "",
      stock: 0,
    },
  });

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = form;
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "images",
  // });
  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    try {
      console.log(values);
      setIsLoading(true);

      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        body: JSON.stringify({
          title: form.getValues("title"),
          description: form.getValues("description"),
          category: form.getValues("category"),
          brand: form.getValues("brand"),
          price: form.getValues("price"),
          sku: form.getValues("sku"),
          thumbnail: form.getValues("thumbnail"),
          // images: form.getValues("images"),
          weight: form.getValues("weight"),
          width: form.getValues("width"),
          height: form.getValues("height"),
          depth: form.getValues("depth"),
          tags: form.getValues("tags"),
          warrantyInformation: form.getValues("warrantyInformation"),
          shippingInformation: form.getValues("shippingInformation"),
          returnPolicy: form.getValues("returnPolicy"),
          availabilityStatus: form.getValues("availabilityStatus"),
          stock: form.getValues("stock"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        console.log("Success!");

        // toast.success("Success! Add new product.");
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
    <div className="h-full w-full items-center justify-center ">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2 justify-end items-end">
            <Button variant="secondary" disabled={isLoading}>
              <Link
                href={siteConfig.shop.product}
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
                  <Plus /> Edit Product
                </div>
              )}
            </Button>
          </div>
          <div className="flex w-full basis gap-4">
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
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <FormControl>
                          <Input
                            id="title"
                            placeholder="Type title here. . ."
                            type="text"
                            autoComplete="name"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="description">Description</FormLabel>

                        <FormControl>
                          <Textarea
                            id="description"
                            placeholder="Type description here. . ."
                            autoComplete="description"
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
                    name="brand"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="brand">Brand</FormLabel>

                        <FormControl>
                          <Input
                            id="brand"
                            placeholder="Type brand here. . ."
                            autoComplete="brand"
                            type="text"
                            disabled={isLoading}
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
            <div className="basis-1/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            // value={field.value.toString()}
                            // onValueChange={field.onChange}
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isCateLoading || isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category..." />
                                {/* <SelectValue placeholder={field.value || "Select a category..."}>{field.value}</SelectValue> */}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* <SelectLabel>Apple</SelectLabel> */}
                              {cateNameList?.map((o, idx) => (
                                <SelectItem key={idx} value={o}>
                                  {o}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topics</FormLabel>
                          <FormControl>
                            <TagInput
                              {...field}
                              placeholder="Enter a topic"
                              tags={tags}
                              className=""
                              setTags={(newTags) => {
                                setTags(newTags);
                                form.setValue(
                                  "tags",
                                  newTags as [string, ...string[]]
                                );
                              }}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="availabilityStatus"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel
                            htmlFor="availabilityStatus"
                            className="flex justify-between items-center"
                          >
                            Product Status
                            {field.value && (
                              <Badge
                                className="rounded-full"
                                variant={
                                  field.value === "Draft"
                                    ? "draft"
                                    : field.value === "Published"
                                    ? "published"
                                    : field.value === "Low Stock"
                                    ? "lowStock"
                                    : field.value === "Out of Stock"
                                    ? "outOfStock"
                                    : null
                                }
                              >
                                {field.value}
                              </Badge>
                            )}
                          </FormLabel>

                          <FormControl>
                            <Select
                              // value={field.value.toString()}
                              // onValueChange={field.onChange}
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a status..." />
                                  {/* <SelectValue placeholder={field.value || "Select a category..."}>{field.value}</SelectValue> */}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {/* <SelectLabel>Apple</SelectLabel> */}
                                {availabilityStatus?.map((o, idx) => (
                                  <SelectItem key={idx} value={o}>
                                    {o}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex w-full basis gap-4">
            {/* <Card className="basis-3/4">
              <CardHeader>
                <CardTitle className="text-xl">Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {fields.map((item, index) => (
                    <div className="w-full space-y-1 " key={item.id}>
                      <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {`Image #${index + 1}`}
                      </div>
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="w-full ">
                          <Controller
                            render={({ field }) => (
                              <Input
                                placeholder="https://..."
                                className="w-full"
                                required
                                disabled={isLoading}
                                {...field}
                              />
                            )}
                            name={`images.${index}`}
                            control={control}
                          />
                          <p className="text-red-500 font-medium flex text-sm">
                            {errors.images
                              ? errors.images[index]?.message
                              : null}
                          </p>
                        </div>

                        <Button
                          color="failure"
                          type="button"
                          className="mt-6"
                          disabled={isLoading}
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  <p className="text-red-500 font-medium flex text-sm">
                    {errors.images ? errors.images.message : null}
                  </p>
                  <Button
                    disabled={fields.length >= 10 || isLoading}
                    type="button"
                    onClick={() => append("")}
                    className="w-20"
                  >
                    Append
                  </Button>
                </div>
              </CardContent>
            </Card> */}
            <Card className="basis-1/4">
              <CardHeader>
                <CardTitle className="text-xl">Thumbnail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="thumbnail">Thumbnail</FormLabel>

                        <FormControl>
                          <Input
                            id="thumbnail"
                            placeholder="Insert thumbnail url here. . ."
                            autoComplete="thumbnail"
                            type="url"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        {/* <div>
                        {form.getValues("thumbnail") !== "" && (
                          <img src={form.getValues("thumbnail")} />
                        )}
                      </div> */}
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex w-full basis gap-4">
            <Card className="basis-full">
              <CardHeader>
                <CardTitle className="text-xl">Dimension</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="weight">Weight</FormLabel>

                        <FormControl>
                          <Input
                            id="weight"
                            placeholder="Type weight here. . ."
                            autoComplete="weight"
                            type="number"
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
                    name="width"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="width">Width</FormLabel>

                        <FormControl>
                          <Input
                            id="width"
                            placeholder="Type width here. . ."
                            autoComplete="width"
                            type="number"
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
                    name="height"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="height">Height</FormLabel>

                        <FormControl>
                          <Input
                            id="height"
                            placeholder="Type height here. . ."
                            autoComplete="height"
                            type="number"
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
                    name="depth"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="depth">Depth</FormLabel>

                        <FormControl>
                          <Input
                            id="depth"
                            placeholder="Type depth here. . ."
                            autoComplete="depth"
                            type="number"
                            disabled={isLoading}
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
          <div className="flex w-full basis gap-4">
            <Card className="basis-full">
              <CardHeader>
                <CardTitle className="text-xl">Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="price">price</FormLabel>

                        <FormControl>
                          <Input
                            id="price"
                            placeholder="Type price here. . ."
                            autoComplete="price"
                            type="number"
                            disabled={isLoading}
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
          <div className="flex w-full basis gap-4">
            <Card className="basis-full">
              <CardHeader>
                <CardTitle className="text-xl">
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="sku">sku</FormLabel>

                        <FormControl>
                          <Input
                            id="sku"
                            placeholder="Type sku here. . ."
                            autoComplete="sku"
                            type="text"
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
                    name="stock"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="stock">Stock</FormLabel>

                        <FormControl>
                          <Input
                            id="stock"
                            placeholder=". . ."
                            autoComplete="stock"
                            type="number"
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
                    name="warrantyInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty Information</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a warranty information..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {warrantiesList?.map((o, idx) => (
                              <SelectItem key={idx} value={o.toString()}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shippingInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Information</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a shipping information..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shippingList?.map((o, idx) => (
                              <SelectItem key={idx} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="returnPolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Policy</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a return policy..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {returnList?.map((o, idx) => (
                              <SelectItem key={idx} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription> */}
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
