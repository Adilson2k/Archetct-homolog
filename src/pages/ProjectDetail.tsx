import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useAdmin();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (project) setActiveImage(project.gallery[0] || project.image);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <p className="font-display text-2xl text-foreground mb-4">Projeto não encontrado</p>
        <button onClick={() => navigate("/")} className="font-body text-sm text-accent uppercase tracking-widest">
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-24 md:pt-28">
        {/* Cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-muted"
        >
          <img src={activeImage || project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          <div className="absolute top-6 left-6 md:top-10 md:left-12">
            <Link
              to="/#projetos"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border font-body text-sm text-foreground hover:bg-background transition-colors"
            >
              <ArrowLeft size={16} /> Voltar
            </Link>
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">{project.category}</p>
              <h1 className="font-display text-4xl md:text-6xl text-foreground leading-tight mb-8">{project.title}</h1>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="border border-border rounded-lg p-6 space-y-5 bg-secondary/40">
                <div className="flex items-start gap-3">
                  <Tag size={16} className="text-accent mt-1" />
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">Categoria</p>
                    <p className="font-body text-sm text-foreground">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-accent mt-1" />
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">Ano</p>
                    <p className="font-body text-sm text-foreground">{project.year}</p>
                  </div>
                </div>
                {project.location && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-accent mt-1" />
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">Localização</p>
                      <p className="font-body text-sm text-foreground">{project.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          </div>

          {/* Gallery */}
          {project.gallery.length > 1 && (
            <div className="mt-16 md:mt-24">
              <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-6">Galeria</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {project.gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveImage(src);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative aspect-[4/3] overflow-hidden bg-muted"
                  >
                    <img
                      src={src}
                      alt={`${project.title} — ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
