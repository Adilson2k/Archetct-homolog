import { motion } from "framer-motion";

const AboutSection = () => {
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
              <p>
                Com mais de 15 anos de experiência, o estúdio ARCOS desenvolve projetos que
                dialogam com o contexto, a luz e as pessoas. Cada obra é uma resposta singular
                às necessidades do lugar e de quem o habita.
              </p>
              <p>
                Nossa abordagem combina rigor técnico com sensibilidade estética, resultando
                em espaços que transcendem a mera funcionalidade para se tornarem experiências
                memoráveis.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { number: "120+", label: "Projetos Realizados" },
              { number: "15", label: "Anos de Experiência" },
              { number: "8", label: "Prêmios Nacionais" },
              { number: "3", label: "Países" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-display text-4xl md:text-5xl text-accent">{stat.number}</p>
                <p className="font-body text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
