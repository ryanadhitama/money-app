import { Inter } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import * as transaction from "@/libs/api/transaction";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: transaction.all,
  });

  return (
    <>
      <Head>
        <title>Money App</title>
      </Head>
      <div className="container max-w-[600px] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Money App</h1>
          <Link href="/create">
            <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Add New
            </button>
          </Link>
        </div>
        <div>
          {data?.map((d: any) => (
            <div
              key={d?._id}
              className="mb-3 flex w-full justify-between items-center py-5 px-5 border-b border-gray-300"
            >
              <div>
                <strong>{d?.title}</strong>
                <br />
                <span>${new Intl.NumberFormat().format(d?.amount)}</span>
              </div>
              <div className="flex gap-3">
                <Link href={`/${d?._id}/edit`}>Edit</Link>{" "}
                <Link className="text-red-500" href={`/${d?._id}/delete`}>Delete</Link>
              </div>
            </div>
          ))}
          {data?.length < 1 && <div className="text-gray-400">No data</div>}
        </div>
      </div>
    </>
  );
}
