import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section>
        <div>
          <h2 className="text-6xl font-semibold font-sans leading-tight">
            Evaluate and Discover Top Talent <br /> Effortlessly!
          </h2>
          <p className="text-lg text-gray-600 mt-5">
            Analyze resumes, gitHub projects, portfolios and achievements to
            rank <br />
            candidates and identify the best using our ai agent.
          </p>
          <Button asChild variant={"outline"} className="mr-3">
            <Link href={"/docs"}>Read Docs</Link>
          </Button>
          <Button asChild className="mt-10">
            <Link href={"/signup"}>Try for Free</Link>
          </Button>
          <p className="text-sm mt-3 text-black/70">
            free credits available, no credit card required.
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
