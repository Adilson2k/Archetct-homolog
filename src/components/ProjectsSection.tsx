import { motion } from "framer-motion";
import { useAdmin } from "@/contexts/AdminContext";

const ProjectCard = ({ project, index }: { project: { image: string; title: string; category: string; year: string; demo: string }; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay: index * 0.1 }}
    className="group cursor-pointer"
  >
    <div className="relative overflow-hidden aspect-[3/4]">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500 flex items-center justify-center">
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 font-body text-sm tracking-widest uppercase px-6 py-3 border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          Live Demo
        </a>
      </div>
    </div>
    <div className="mt-4 flex items-baseline justify-between">
      <div>
        <h3 className="font-display text-lg text-foreground">{project.title}</h3>
        <p className="font-body text-sm text-muted-foreground mt-1">{project.category}</p>
      </div>
      <span className="font-body text-sm text-muted-foreground">{project.year}</span>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const { projects } = useAdmin();

  return (
    <section id="projetos" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-3">Portfólio</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">Projetos Selecionados</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
