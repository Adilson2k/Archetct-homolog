import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contato" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-3">Contato</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
            Vamos construir <span className="italic">juntos</span>
          </h2>
          <div className="space-y-6 font-body text-muted-foreground">
            <div>
              <p className="text-sm tracking-widest uppercase text-foreground mb-1">Email</p>
              <p>contato@arcosarquitetura.com</p>
            </div>
            <div>
              <p className="text-sm tracking-widest uppercase text-foreground mb-1">Telefone</p>
              <p>+55 (11) 3456-7890</p>
            </div>
            <div>
              <p className="text-sm tracking-widest uppercase text-foreground mb-1">Endereço</p>
              <p>Rua Oscar Freire, 1200<br />São Paulo, SP — Brasil</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { label: "Nome", type: "text", id: "name" },
            { label: "Email", type: "email", id: "email" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="font-body text-sm tracking-widest uppercase text-foreground block mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="font-body text-sm tracking-widest uppercase text-foreground block mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-accent text-accent-foreground px-10 py-3 font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Enviar
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
