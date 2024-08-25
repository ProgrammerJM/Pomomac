import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="relative dark:bg-[#040404] bg-white dark:text-white text-black flex justify-center items-center flex-col mx-auto overflow-clip ">
      <div className="max-w-7xl w-full">
        <Header />
        <Footer />
      </div>
    </main>
  );
}
