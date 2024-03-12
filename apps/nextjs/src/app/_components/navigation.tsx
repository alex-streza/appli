import Link from "next/link";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

import { Button, Logo } from "@appli/ui";

export const Navigation = () => {
  return (
    <nav className="flex w-full items-center justify-between p-5 md:px-40 md:py-8">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/alex-streza/appli"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="icon">
            <GithubLogo weight="fill" size={24} />
          </Button>
        </a>
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </nav>
  );
};
