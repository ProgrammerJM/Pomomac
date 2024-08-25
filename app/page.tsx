import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col mx-auto overflow-clip ">
      <div className="max-w-7xl w-full">
        <Header />
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
