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
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { shippingStatusFormSchema } from "@/commons/shopFormValidation";
import {
  Loader2,
  LogOut,
  Plus,
  ShoppingCart,
  CircleCheckBig,
  CalendarCheck,
  CreditCard,
  Truck,
  UserRound,
  Mail,
  Phone,
  ScrollText,
  MapPin,
  Check,
  Gift,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { shippingStatus } from "@/data/orderConstants";
import { ICartType, IUserType } from "@/models/dummyType";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Schema = z.infer<typeof shippingStatusFormSchema>;

function exchangeCurrency(item: string) {
  const amount = parseFloat(item);
  // const amount = parseFloat("121");
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return <div>{formatted}</div>;
}

export default function OrderForm() {
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<ICartType>();
  const [user, setUser] = useState<IUserType>();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`https://dummyjson.com/carts/1`, {
        method: "GET",
      });
      const data = await res.json();
      setOrder(data);
      // setCateList(data);
      setIsLoading(false);
    };
    fetchOrder();
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/1`, {
        method: "GET",
      });
      const data = await res.json();
      // setCateList(data);
      setUser(data);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const createdDate = new Date();

  const [shippingList, setShippingList] = useState<string[]>(shippingStatus);

  const form = useForm<Schema>({
    resolver: zodResolver(shippingStatusFormSchema),
    defaultValues: {
      shippingStatus: "Order Placed",
    },
  });

  async function onSubmit(values: Schema) {
    try {
      console.log(values);
      setIsLoading(true);
      setStatus(values.shippingStatus || "");
      console.log("Success!");
      toast.success(
        <pre className="mr-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full w-full items-center justify-center ">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2 justify-end items-center">
            <div className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="shippingStatus"
                render={({ field }) => (
                  <FormItem>
                    <VisuallyHidden>
                      <FormLabel>Shipping Status</FormLabel>
                    </VisuallyHidden>
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
                        {shippingList?.map((o, idx) => (
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
              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Plus /> Update Status
                  </div>
                )}
              </Button>
            </div>
            <Button variant="secondary" disabled={isLoading}>
              <LogOut style={{ transform: "rotate(270deg)" }} /> Export
            </Button>

            <Button disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <Loader2 className="animate-spin" />
                  Please wait...
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Plus /> Invoice
                </div>
              )}
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row w-full basis gap-6">
            <div className="basis-2/3 flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <Card className="basis-1/2 w-full h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div>Order #{order?.id}</div>
                      <Badge variant="decrease" className="rounded-full">
                        -25%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                          <CalendarCheck className="h-6 w-6" />
                        </div>
                        <div>Added</div>
                      </div>
                      <div>{createdDate.toDateString()}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <div>Payment Method</div>
                      </div>
                      <div>Visa</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                          <Truck className="h-6 w-6" />
                        </div>
                        <div>Shipping Method</div>
                      </div>
                      <div>Flat Shipping</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="basis-1/2 w-full h-full">
                  <CardHeader>Customer</CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                          <UserRound className="h-6 w-6" />
                        </div>
                        <div>Customer</div>
                      </div>
                      <div>
                        {user?.firstName} {user?.lastName}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>Email</div>
                      </div>
                      <div>{user?.email}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>Phone</div>
                      </div>
                      <div>{user?.phone}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Order list */}
              <Card className="basis-full w-full ">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div>Order List</div>
                    <Badge variant="increase" className="rounded-full">
                      {order?.products.length} products
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>QTY</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order?.products.map((o) => (
                        <TableRow key={o.id}>
                          <TableCell className="font-medium">
                            <div className="flex gap-2">
                              <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={o.thumbnail} alt={o.title} />
                                <AvatarFallback className="rounded-lg">
                                  CN
                                </AvatarFallback>
                              </Avatar>
                              <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                  {o.title}
                                </span>
                                <span>Black</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>302011</TableCell>
                          <TableCell>{o.quantity} pcs</TableCell>
                          <TableCell>
                            {exchangeCurrency(o.price.toString())}
                          </TableCell>
                          <TableCell className="text-right">
                            {exchangeCurrency(o.total.toString())}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell className="text-right">
                          {exchangeCurrency(
                            order?.discountedTotal.toString() || ""
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell>VAT (0%)</TableCell>
                        <TableCell className="text-right">
                          {exchangeCurrency("0")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell>Shipping Rate</TableCell>
                        <TableCell className="text-right">
                          {exchangeCurrency("5")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">
                          {exchangeCurrency(
                            (order?.discountedTotal + 5).toString()
                          )}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="basis-1/3 space-y-6">
              <Card className="w-full">
                <CardHeader>Document</CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                        <ScrollText className="h-6 w-6" />
                      </div>
                      <div>Invoice</div>
                    </div>
                    <div>INV-32011</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div>Shipping</div>
                    </div>
                    <div>SHP-2011REG</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full">
                        <CircleCheckBig className="h-6 w-6" />
                      </div>
                      <div>Reward</div>
                    </div>
                    <div>480 point</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>Address</CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full size-10">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div>Billing</div>
                      <div className="line-clamp-2">
                        {user?.address.address}, {user?.address.city},{" "}
                        {user?.address.state}, {user?.address.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="p-1 bg-gray-200 border-4 border-gray-100 text-gray-500 rounded-full size-10">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div>Shipping</div>
                      <div className="line-clamp-2">
                        {user?.address.address}, {user?.address.city},{" "}
                        {user?.address.state}, {user?.address.country}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>Order Status</CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <div
                      className={`p-1 rounded-full size-10 ${
                        status !== ""
                          ? "bg-primary/30 border-4 border-primary/10 text-primary/50"
                          : "bg-gray-200 border-4 border-gray-100 text-gray-500"
                      }`}
                    >
                      <ShoppingCart className="h-6 w-6" />
                    </div>
                    <div>
                      <div>Order Placed</div>
                      <div>DD/MM/YY, 00:00</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`p-1 rounded-full size-10 ${
                        status !== "" && status !== "Order Placed"
                          ? "bg-primary/30 border-4 border-primary/10 text-primary/50"
                          : "bg-gray-200 border-4 border-gray-100 text-gray-500"
                      }`}
                    >
                      <RefreshCw className="h-6 w-6" />
                    </div>
                    <div>
                      <div>Processing</div>
                      <div>DD/MM/YY, 00:00</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`p-1 rounded-full size-10 ${
                        status !== "" &&
                        status !== "Order Placed" &&
                        status !== "Processing"
                          ? "bg-primary/30 border-4 border-primary/10 text-primary/50"
                          : "bg-gray-200 border-4 border-gray-100 text-gray-500"
                      }`}
                    >
                      <Gift className="h-6 w-6" />
                    </div>
                    <div>
                      <div>Packed</div>
                      <div>DD/MM/YY, 00:00</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`p-1 rounded-full size-10 ${
                        status !== "" &&
                        status !== "Order Placed" &&
                        status !== "Processing" &&
                        status !== "Packed"
                          ? "bg-primary/30 border-4 border-primary/10 text-primary/50"
                          : "bg-gray-200 border-4 border-gray-100 text-gray-500"
                      }`}
                    >
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <div>Shipping</div>
                      <div>DD/MM/YY, 00:00</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`p-1 rounded-full size-10 ${
                        status === "Delivered"
                          ? "bg-primary/30 border-4 border-primary/10 text-primary/50"
                          : "bg-gray-200 border-4 border-gray-100 text-gray-500"
                      }`}
                    >
                      <Check className="h-6 w-6" />
                    </div>
                    <div>
                      <div>Delivered</div>
                      <div>DD/MM/YY, 00:00</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
