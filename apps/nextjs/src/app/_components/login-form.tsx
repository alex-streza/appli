"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { GoogleLogo } from "@phosphor-icons/react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@appli/ui";

import { env } from "~/env";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const email = useWatch({ control: form.control, name: "email" });

  return (
    <div className="mt-8 w-full md:max-w-[340px]">
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your supa' fancy e-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoginLink
            authUrlParams={{
              connection_id: env.NEXT_PUBLIC_KINDE_CONN_ID_PASSWORD,
              login_hint: email,
            }}
          >
            <Button type="button" className="mt-2 w-full">
              Sign in
            </Button>
          </LoginLink>
          <LoginLink
            authUrlParams={{
              connection_id: env.NEXT_PUBLIC_KINDE_CONN_ID_GOOGLE,
            }}
          >
            <Button
              type="button"
              variant="secondary"
              className="w-full items-center gap-2"
            >
              <GoogleLogo size={24} />
              Sign in with Google
            </Button>
          </LoginLink>
        </form>
      </Form>
    </div>
  );
};
