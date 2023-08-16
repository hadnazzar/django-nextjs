import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "src/components/ui/button";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

const SignInSignOutButton = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  const signOutHandler = async () => {
    await signOut();
  };

  const signInHandler = async () => {
    await router.push("/sign-in");
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {user && (
          <span className="text-sm font-semibold text-slate-800 lg:text-sm">
            {user.name}
          </span>
        )}
        {session ? (
          <Button onClick={signOutHandler} size="sm" className="rounded-full">
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <span className="ml-2 text-xs lg:text-sm">Sign out</span>
          </Button>
        ) : (
          <Button onClick={signInHandler} size="sm" className="rounded-full">
            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            <span className="ml-2 text-xs lg:text-sm">Sign in</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default SignInSignOutButton;
