import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "src/components/Head";
import Header from "src/components/Header";
import ProductsTable from "src/components/ProductTable";
import { getServerAuthSession } from "src/server/auth";
import { serialize } from "src/utils/general-helpers";

const Home = () => {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <>
      <Head />
      <Header />
      <div className="container rounded-md bg-slate-50 px-4 py-6 drop-shadow-md lg:my-10">
        <main className="flex w-full flex-col items-start justify-start">
          {user ? (
            <>
              <h1 className="text-xl font-semibold text-slate-600 lg:text-2xl">
                Products
              </h1>
              <ProductsTable />
            </>
          ) : (
            <h1 className="self-center text-xl font-semibold text-slate-600 lg:text-2xl">
              Please Sign In to view products
            </h1>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: {
      session: serialize(session),
    },
  };
};
