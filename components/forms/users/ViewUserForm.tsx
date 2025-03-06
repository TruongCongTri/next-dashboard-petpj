"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Link,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Pen,
  Phone,
  ShoppingCart,
} from "lucide-react";
import { siteConfig } from "../../../data/site";
import { IUserType } from "@/models/dummyType";
import { useParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ViewUserForm() {
  const param = useParams();
  const [user, setUser] = useState<IUserType>();
  const [isLoading, setIsLoading] = useState(true);

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
  }, [param.id]);

  return (
    <div className="h-full w-full items-center justify-center ">
      {isLoading ? (
        <Card>
          <CardContent>
            <div className="mt-6">
              <div className="h-[148px] bg-primary rounded-xl" />
              <Skeleton
                className="h-[164px] w-[164px] rounded-full -mt-20 mx-auto z-10"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
            </div>
            <div className="px-4 pb-4 space-y-4">
              <div className="flex flex-col justify-center items-center mt-2">
                <div className="flex justify-center items-center gap-1">
                  {/* <h2 className="text-lg font-semibold">John Doe</h2> */}
                  <Skeleton className="h-4 w-[100px]" />
                  <Button disabled={isLoading} variant="ghost" asChild>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Pen />}
                  </Button>
                </div>
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Separator />
              <div className="flex flex-col justify-around space-y-4">
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">User ID</p>
                    <Skeleton className="h-4 w-[200px] mt-2" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Billing Email</p>
                    <Skeleton className="h-4 w-[200px] mt-2" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <Skeleton className="h-4 w-[200px] mt-2" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Address</p>
                    <Skeleton className="h-4 w-[200px] mt-2" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Latest Transaction</p>
                    <Skeleton className="h-4 w-[200px] mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          {/* <CardHeader>
            
          </CardHeader> */}
          <CardContent>
            <div className="mt-6">
              <div className="h-[148px] bg-primary rounded-xl" />
              <Image
                src="/images/placeholder.svg"
                height="164"
                width="164"
                className="rounded-full -mt-20 mx-auto"
                alt="User avatar"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
            </div>
            <div className="px-4 pb-4 space-y-4">
              <div className="text-center mt-2">
                <div className="flex justify-center items-center gap-1">
                  <h2 className="text-lg font-semibold">
                    {user?.firstName} {user?.maidenName} {user?.lastName}{" "}
                  </h2>
                  <Button disabled={isLoading} variant="ghost">
                    <Link href={`${siteConfig.shop.customer}/${param.id}/edit`}>
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Pen />
                      )}
                    </Link>
                  </Button>
                </div>
                <p className="text-gray-500">Software Engineer</p>
              </div>
              <Separator />
              <div className="flex flex-col justify-around space-y-4">
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">User ID</p>
                    <p className="">ID-{user?.id}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Billing Email</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p>{user?.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Address</p>
                    <p>
                      {user?.address.address} {user?.address.city}{" "}
                      {user?.address.state} {user?.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

{
  /* <div className="flex items-center justify-center rounded-xl">
          <div className="rounded-xl  p-2 w-full">
            <div className="h-[148px] bg-primary rounded-xl" />
            <Image
              src="/images/placeholder.svg"
              height="164"
              width="164"
              className="rounded-full -mt-20 mx-auto"
              alt="User avatar"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
            <div className="px-4 pb-4 space-y-4">
              <div className="text-center mt-2">
                <div className="flex justify-center items-center gap-1">
                  <h2 className="text-lg font-semibold">
                    {user?.firstName} {user?.maidenName} {user?.lastName}{" "}
                  </h2>
                  <Button disabled={isLoading} variant="ghost">
                    <Link href={`${siteConfig.shop.customer}/${param.id}/edit`}>
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Pen />
                      )}
                    </Link>
                  </Button>
                </div>
                <p className="text-gray-500">Software Engineer</p>
              </div>
              <Separator />
              <div className="flex flex-col justify-around space-y-4">
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">User ID</p>
                    <p className="">ID-{user?.id}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Billing Email</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p>{user?.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 rounded-full bg-gray-200 border-4 border-gray-100">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Address</p>
                    <p>
                      {user?.address.address} {user?.address.city}{" "}
                      {user?.address.state} {user?.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */
}
