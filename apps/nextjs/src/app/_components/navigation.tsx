import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  GithubLogo,
  GoogleChromeLogo,
  House,
  Key,
  SignOut,
  UserCircle,
  UserCircleGear,
} from "@phosphor-icons/react/dist/ssr";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Logo,
  ThemeToggle,
} from "@appli/ui";
import { cn } from "@appli/ui/lib/utils";

export const Navigation = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  return (
    <nav
      className={cn(
        "z-10 flex w-full items-center justify-between px-5 py-3 md:px-20 md:py-5",
        authenticated && "fixed left-0 top-0 bg-card",
      )}
    >
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-5">
        <ThemeToggle />
        <a
          href="https://github.com/alex-streza/appli"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="h-8">
            <GithubLogo weight="fill" size={24} />
          </Button>
        </a>
        {!authenticated && (
          <>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
        {authenticated && (
          <>
            <Link
              href="/dashboard"
              className="flex flex-col items-center gap-0 font-medium"
            >
              <House size={24} />
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col items-center gap-0 font-medium opacity-50 transition-all data-[state=open]:opacity-100">
                <UserCircle size={24} />
                You
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserCircleGear size={20} />
                  Account settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <GoogleChromeLogo size={20} />
                  Install extension
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Key size={20} />
                  Copy API key
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutLink>
                  <DropdownMenuItem className="text-red-600 focus:text-red-500">
                    <SignOut size={20} />
                    Log out
                  </DropdownMenuItem>
                </LogoutLink>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {/* <Link href="/login">
        <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link> */}
      </div>
    </nav>
  );
};
