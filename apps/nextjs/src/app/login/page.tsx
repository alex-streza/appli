// import { LoginForm } from "../_components/login-form";

export default async function RegisterPage() {
  return (
    <main className="container h-screen py-16">
      <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center">
        <h1 className="text-center text-4xl font-bold">Welcome back </h1>
        <p className="mt-3 max-w-xl text-center text-sm font-medium text-gray-500 md:text-base">
          Enter your e-mail and we&apos;ll send you a magic link to login.
        </p>
        {/* <LoginForm /> */}
      </div>
    </main>
  );
}
