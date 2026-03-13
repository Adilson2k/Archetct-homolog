import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const ContactSection = () => {
  const { profile } = useAdmin();

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
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-accent" />
              <div>
                <p className="text-sm tracking-widest uppercase text-foreground mb-1">Email</p>
                <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">{profile.email}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-accent" />
              <div>
                <p className="text-sm tracking-widest uppercase text-foreground mb-1">Telefone</p>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">{profile.phone}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-accent" />
              <div>
                <p className="text-sm tracking-widest uppercase text-foreground mb-1">Localização</p>
                <p>{profile.location}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="p-3 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors">
              <Instagram size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors">
              <Linkedin size={20} />
            </a>
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
