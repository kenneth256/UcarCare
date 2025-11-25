import CarHero from "@/components/CarHero/CarHero";
import Feature from "@/components/feature/Feature";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SubHero from "@/components/subhero/SubHero";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 overflow-scroll">
      <main className="max-w-7xl w-full flex flex-col gap-10">
        <Header />
        <CarHero />
        <SubHero />
        <Feature />
        <Footer />
      </main>
    </div>
  );
};

export default page;
