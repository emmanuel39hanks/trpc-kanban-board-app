import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "../components/layout/Header";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

  if (isMobileDevice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Mobile Access Unavailable</h1>
          <p className="text-xl mb-8">
            We're sorry, but LemoBoards is currently optimized for desktop use
            only. Please visit us on a desktop device for the best experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
}

export default trpc.withTRPC(MyApp);
