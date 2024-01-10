import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { transactionSchema } from "@/schema";
import { Transaction } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as transaction from "@/libs/api/transaction";
import { useEffect } from "react";
import Head from "next/head";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => transaction.get(id as string),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Transaction) => {
      return transaction.update(id as string, data);
    },
    onSuccess: () => {
      alert("Transaction edited successfully");
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<Transaction> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    reset({
      title: data?.title,
      amount: data?.amount,
      type: data?.type,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
    <Head>
      <title>Edit Transaction</title>
    </Head>
    <div className="container max-w-[600px] mx-auto">
      <h1 className="text-3xl my-8">Edit Transaction</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            type="text"
            id="title"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="amount">Amount</label>
          <input
            {...register("amount", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
            })}
            type="number"
            id="amount"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
          />
          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="type">Type</label>
          <select
            {...register("type")}
            id="type"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md block w-full"
          >
            <option selected value="in">
              IN
            </option>
            <option value="out">OUT</option>
          </select>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Update
        </button>
      </form>
    </div>
    </>
  );
}
