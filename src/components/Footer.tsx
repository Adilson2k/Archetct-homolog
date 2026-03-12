import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-lg tracking-wider text-foreground">ALMEDINO MABIEL</p>
        
        <div className="flex items-center gap-5">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Linkedin size={20} />
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="font-body text-sm text-muted-foreground">
            © 2025 Almedino Mabiel Arquitetura. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-muted-foreground/60 mt-1">
            Feito por <span className="text-accent">Adilson Soares</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
