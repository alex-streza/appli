// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
// import { GoogleLogo } from "@phosphor-icons/react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import {
//   Button,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   Input,
// } from "@appli/ui";

// import { env } from "~/env";

// const registerFormSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address",
//   }),
// });

// export const RegisterForm = () => {
//   const form = useForm<z.infer<typeof registerFormSchema>>({
//     resolver: zodResolver(registerFormSchema),
//   });
//   const { register } = useKindeAuth();

//   const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
//     await register({
//       authUrlParams: {
//         register_hint: values.email,
//         connection_id: env.NEXT_PUBLIC_KINDE_CONN_ID_PASSWORD,
//       },
//     });
//   };

//   return (
//     <div className="mt-8 w-full md:max-w-[340px]">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col gap-4"
//         >
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter your supa' fancy e-mail"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" className="mt-2 w-full">
//             Sign up
//           </Button>
//           <Button
//             type="button"
//             variant="secondary"
//             className="w-full items-center gap-2"
//             onClick={() =>
//               register({
//                 authUrlParams: {
//                   connection_id: env.NEXT_PUBLIC_KINDE_CONN_ID_GOOGLE,
//                 },
//               })
//             }
//           >
//             <GoogleLogo size={24} />
//             Sign up with Google
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };
