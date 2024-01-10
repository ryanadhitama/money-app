import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as transaction from "@/libs/api/transaction";
import Head from "next/head";

export default function Delete() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => transaction.get(id as string),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return transaction.destroy(id as string);
    },
    onSuccess: () => {
      alert("Transaction deleted successfully");
      router.push("/");
    },
  });

  const onDelete = () => {
    mutation.mutate(id as string);
  };

  return (
    <>
      <Head>
        <title>Delete Transaction</title>
      </Head>
      <div className="container max-w-[600px] mx-auto">
        <h1 className="text-3xl my-8">Delete Transaction</h1>
        <p>
          Are you sure want to delete <strong>{data?.title}</strong>?
        </p>
        <button
          onClick={() => onDelete()}
          className="mt-8 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Delete
        </button>
      </div>
    </>
  );
}
