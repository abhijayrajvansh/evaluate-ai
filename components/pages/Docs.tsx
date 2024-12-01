import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Docs = () => {
  return (
    <div className="container mx-auto w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-5xl">Documentation</p>
        <p>comming soon...</p>
        <Button asChild className="mt-7 text-lg px-7 py-5">
          <Link href={"/"}>Go Back!</Link>
        </Button>
      </div>
    </div>
  );
};

export default Docs;
