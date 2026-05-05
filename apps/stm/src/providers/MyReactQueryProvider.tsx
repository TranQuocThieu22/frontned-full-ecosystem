"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
    mutations: {
      // onSuccess: () => {
      //   queryClient.invalidateQueries();
      // },
    },
  },
});
export default function MyReactQueryProvider({ children }: { children?: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NEXT_PUBLIC_SHOW_QUERY_DEVTOOL == "1" &&
        <ReactQueryDevtools buttonPosition={"bottom-left"} initialIsOpen={false} />
      }
    </QueryClientProvider>
  )
}
