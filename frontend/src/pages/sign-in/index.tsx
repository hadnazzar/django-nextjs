import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { type GetServerSidePropsContext } from "next/types";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { getServerAuthSession } from "src/server/auth";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

const SignInPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { handleSubmit, formState, control } = form;
  const { isSubmitting } = formState;
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function onSubmit(values: FormValues) {
    setError(null);
    const { username, password } = values;
    const isSignedIn = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (isSignedIn) {
      const { error } = isSignedIn;
      if (error) {
        if (error === "CredentialsSignin") {
          setError("Username or password is incorrect.");
        } else {
          setError(error);
        }
      } else {
        return router.push("/");
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <Card>
            <CardHeader className="flex items-center justify-center">
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-start gap-2">
                      <FormLabel>Username</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-start gap-2">
                      <FormLabel>Password</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-start gap-3">
              <Button
                variant="default"
                className="flex w-full items-center justify-center gap-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                )}{" "}
                Sign in
              </Button>

              {error && (
                <div className="self-center text-sm text-red-500">{error}</div>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
