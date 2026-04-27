import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Hero from "@/sections/Hero";
import Capabilities from "@/sections/Capabilities";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Capabilities />
        <Projects />
      </main>

      <Footer />
    </>
  );
}