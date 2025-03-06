"use client";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { ICategoryType, IProductType } from "@/models/dummyType";
import { TagInput } from "@/components/ui/customize/tag-input";
import { useParams, useRouter } from "next/navigation";
import {
  warranties,
  returnPolicies,
  shippingTimes,
  availabilityStatus,
} from "../../../data/prodConstants";
import { Badge } from "@/components/ui/badge";

type Schema = z.infer<typeof productFormSchema>;

export default function ViewProdForm() {
  const router = useRouter();
  const param = useParams();
  const [prod, setProd] = useState<IProductType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isCateLoading, setIsCateLoading] = useState(true);
  const [cateNameList, setCateNameList] = useState<string[]>();
  const [tags, setTags] = React.useState<string[]>([]);

  const [warrantiesList] = useState<string[]>(warranties);
  const [returnList] = useState<string[]>(returnPolicies);
  const [shippingList] = useState<string[]>(shippingTimes);
  console.log(cateNameList);
  console.log(warrantiesList);

  useEffect(() => {
    const fetchProds = async () => {
      const res = await fetch(`https://dummyjson.com/products/${param.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setProd(data);
      setTags(data.tags);
      setIsLoading(false);
    };
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
    fetchProds();
    fetchCates();
  }, [param]);

  const defaultValues: Partial<Schema> = {
    title: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    sku: "",

    thumbnail: "",
    images: [""],
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
  };

  const values: Schema = {
    title: prod?.title || "",
    description: prod?.description || "",
    price: prod?.price || 0,
    category: prod?.category || "",
    brand: prod?.brand || "",
    sku: prod?.sku || "",

    thumbnail: prod?.thumbnail || "",
    images: prod?.images || [""],
    weight: prod?.weight,
    width: prod?.dimensions.width,
    height: prod?.dimensions.height,
    depth: prod?.dimensions.depth,
    tags: prod?.tags || [""],
    warrantyInformation: prod?.warrantyInformation,
    shippingInformation: prod?.shippingInformation,
    returnPolicy: prod?.returnPolicy,
    availabilityStatus: prod?.availabilityStatus,
    stock: prod?.stock,
  };

  const form = useForm<Schema>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
    values,
  });

  const { setValue } = form;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
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
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2 justify-end items-end">
            <Button variant="secondary">
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
                            disabled={true}
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
                            disabled={true}
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
            <div className="space-y-6 basis-1/4">
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
                            value={field.value.toString()}
                            disabled={isCateLoading || true}
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
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Tags</FormLabel>
                          <FormControl>
                            <TagInput
                              {...field}
                              placeholder="Enter a topic"
                              tags={tags}
                              className="hidden"
                              setTags={(newTags) => {
                                setTags(newTags);
                                setValue(
                                  "tags",
                                  newTags as [string, ...string[]]
                                );
                              }}
                              disabled={true}
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
            <Card className="basis-3/4">
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
                                disabled={true}
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
                          className="mt-6 hidden"
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
                    disabled={fields.length >= 10}
                    type="button"
                    onClick={() => append("")}
                    className="w-20 hidden"
                  >
                    Append
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                        <FormLabel htmlFor="sku">SKU</FormLabel>

                        <FormControl>
                          <Input
                            id="sku"
                            placeholder="Type sku here. . ."
                            autoComplete="sku"
                            type="text"
                            disabled={true}
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
                            disabled={true}
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
                          disabled={true}
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
                    name="shippingInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Information</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={true}
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
                          disabled={true}
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
