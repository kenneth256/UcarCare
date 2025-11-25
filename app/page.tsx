import CarHero from "@/components/CarHero/CarHero";
import ChatInterface from "@/components/chatInterface/chat";
import Feature from "@/components/feature/Feature";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SubHero from "@/components/subhero/SubHero";

const page = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 py-10 ">
      <main className="max-w-7xl w-full flex flex-col gap-10 relative px-4  hide-scrollbar">
        <Header />
        <ChatInterface />
        <CarHero />
        <SubHero />
        <Feature />
        <Footer />
      </main>
    </div>
  );
};

export default page;
