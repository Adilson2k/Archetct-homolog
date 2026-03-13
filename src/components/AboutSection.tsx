import { motion } from "framer-motion";
import portrait from "@/assets/almedino-portrait.jpg";
import { useAdmin } from "@/contexts/AdminContext";

const AboutSection = () => {
  const { profile } = useAdmin();

  return (
    <section id="sobre" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-3">Sobre</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
              Criando espaços que <span className="italic">inspiram</span>
            </h2>
            <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
              <p>{profile.bio1}</p>
              <p>{profile.bio2}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <img
                src={portrait}
                alt={`${profile.name} - Arquitecto`}
                className="w-80 md:w-96 object-cover aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent px-6 py-4">
                <p className="font-display text-lg text-accent-foreground">{profile.name}</p>
                <p className="font-body text-xs text-accent-foreground/80 tracking-widest uppercase">{profile.title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
