import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <>
      <section className="py-20 text-center h-[90vh] flex items-center justify-center">
        <div>
          <h2 className="text-6xl font-semibold font-sans leading-tight">
            Evaluate and Discover Top Talent <br /> Effortlessly!
          </h2>
          <p className="text-lg text-gray-600 mt-5">
            Analyze resumes, gitHub projects, portfolios and achievements to
            rank <br />
            candidates and identify the best using our ai agent.
          </p>
          <Button variant={"outline"} className="mr-3">
            Read Docs
          </Button>
          <Button className="mt-10">Try for Free</Button>
          <p className="text-sm mt-2 text-black/70">
            free credits, no credit card required.
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
