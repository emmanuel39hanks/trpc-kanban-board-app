import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "../components/layout/Header";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
}

export default trpc.withTRPC(MyApp);
