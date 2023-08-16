import Link from "next/link";
import SignInSignOutButton from "src/components/SignInSignOutButton";

const Header = () => {
  return (
    <>
      <header className="bg-orange-300 py-4 drop-shadow-sm">
        <div className="container flex w-full items-center justify-between px-4">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-800 lg:text-3xl"
          >
            what.
          </Link>
          <SignInSignOutButton />
        </div>
      </header>
    </>
  );
};

export default Header;
