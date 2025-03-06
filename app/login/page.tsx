import React from "react";

import LoginForm from "@/components/forms/LoginForm";

import { SquarePlus } from "lucide-react";
import SigninForm from "@/components/forms/SigninForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <SquarePlus className="size-4" />
          </div>
          Dashlab
        </a>
        <LoginForm />
        {/* <SigninForm /> */}
      </div>
    </div>
  );
}
