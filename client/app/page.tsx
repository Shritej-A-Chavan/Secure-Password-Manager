import About from "./components/About";
import Contact from "./components/Contact";
import Features from "./components/Features";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <Contact />
    </div>
  );
}
