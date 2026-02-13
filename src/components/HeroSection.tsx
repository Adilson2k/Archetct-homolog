import { motion } from "framer-motion";
import heroImage from "@/assets/hero-architecture.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Arquitetura moderna com linhas geométricas e luz dourada"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-primary-foreground/70 mb-4"
        >
          Estúdio de Arquitetura
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] max-w-4xl"
        >
          Onde a forma
          <br />
          <span className="italic">encontra</span> a função
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 w-16 h-px bg-accent"
        />
      </div>
    </section>
  );
};

export default HeroSection;
