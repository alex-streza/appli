"use client";

import { useState } from "react";
import { ArrowRight, Envelope, Spinner } from "@phosphor-icons/react";

import { Button, Input } from "@appli/ui";

import { api } from "~/trpc/react";

export const JoinWaitlist = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const joinWaitlist = api.waitlist.joinWaitlist.useMutation({
    onError: (error) => {
      setError(error.message);
    },
    onSuccess: ({ count }) => {
      setEmail("");
      setError(null);
      setMessage(
        `You have been added to the waitlist! You're number ${count} in line.`,
      );
    },
  });

  return (
    <div className="w-full max-w-[340px]">
      <form
        className="relative mt-8 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          email.match(/.+@.+\..+/) && joinWaitlist.mutate({ email });
        }}
      >
        <Input
          type="email"
          className="peer h-12 w-full pl-12"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Envelope
          className="absolute left-4 top-3 text-foreground/50 transition-colors peer-focus:text-foreground/100"
          size={24}
        />
        <Button
          className="absolute right-1 top-1"
          size="icon"
          type="submit"
          disabled={joinWaitlist.isPending}
        >
          {joinWaitlist.isPending ? (
            <Spinner size={24} className="animate-spin" />
          ) : (
            <ArrowRight size={24} />
          )}
        </Button>
      </form>
      {error && <p className="mr-auto mt-2 text-sm text-red-600">{error}</p>}
      {message && <p className="mr-auto mt-2 text-sm">{message}</p>}
    </div>
  );
};
