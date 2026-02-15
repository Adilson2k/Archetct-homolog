import { motion } from "framer-motion";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const projects = [
  { image: project1, title: "Residência Horizonte", category: "Residencial", year: "2024", demo: "https://example.com/residencia-horizonte" },
  { image: project2, title: "Torre Meridiano", category: "Comercial", year: "2023", demo: "https://example.com/torre-meridiano" },
  { image: project3, title: "Loft Essência", category: "Interiores", year: "2024", demo: "https://example.com/loft-essencia" },
  { image: project4, title: "Museu da Luz", category: "Cultural", year: "2023", demo: "https://example.com/museu-da-luz" },
  { image: project5, title: "Casa Raízes", category: "Sustentável", year: "2022", demo: "https://example.com/casa-raizes" },
  { image: project6, title: "Hotel Brisa", category: "Hospitalidade", year: "2024", demo: "https://example.com/hotel-brisa" },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
