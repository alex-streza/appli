"use client";

import { useState } from "react";
import { ArrowRight, Envelope, Spinner } from "@phosphor-icons/react";

import { Button, Input } from "@appli/ui";

import { api } from "~/trpc/react";

export const JoinWaitlist = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const joinWaitlist = api.post.joinWaitlist.useMutation({
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className="w-full max-w-80">
      <div className="relative mt-8 w-full">
        <Input
          type="email"
          className="peer h-12 w-full pl-12"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Envelope
          className="absolute left-4 top-3 text-zinc-300 transition-colors peer-focus:text-zinc-900"
          size={24}
        />
        <Button
          className="absolute right-1 top-1"
          size="icon"
          onClick={() =>
            email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) &&
            joinWaitlist.mutate({ email })
          }
          disabled={joinWaitlist.isPending}
        >
          {joinWaitlist.isPending ? (
            <Spinner size={24} className="animate-spin" />
          ) : (
            <ArrowRight size={24} />
          )}
        </Button>
      </div>
      {error && <p className="mr-auto mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
