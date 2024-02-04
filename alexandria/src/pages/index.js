import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Auth from "@/components/Auth";
import Navbar from "@/components/Navbar"
import Landing from "@/components/landing";
import { useState, useEffect } from "react";
import StaticGenerationSearchParamsBailoutProvider from "next/dist/client/components/static-generation-searchparams-bailout-provider";

const inter = Inter({ subsets: ["latin"] });

const LIB_ROUTE = "/library"

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-row">
      <div>

      </div>
      <div className="">

      </div>
    </div>
  );
}
