"use client";

import React from "react";
import NavigationBar from "@/components/parts/NavigationBar";
import HeroSection from "../parts/HeroSection";
import MobileViewWarning from "../parts/MobileViewWarning";

const Home = () => {
  return (
    <>
      <div className="wrapper">
        <NavigationBar />
        <HeroSection />
      </div>
      <MobileViewWarning />
    </>
  );
};

export default Home;
