import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin, CATEGORIES } from "@/contexts/AdminContext";

const ALL = "Todos";

const ProjectCard = ({
  project,
  index,
}: {
  project: { id: string; slug: string; image: string; title: string; category: string; year: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
  >
    <Link to={`/projetos/${project.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[3/4] bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
          <p className="font-body text-sm text-muted-foreground mt-1">{project.category}</p>
        </div>
        <span className="font-body text-sm text-muted-foreground">{project.year}</span>
      </div>
    </Link>
  </motion.div>
);

const ProjectsSection = () => {
  const { projects } = useAdmin();
  const [active, setActive] = useState<string>(ALL);

  const availableCategories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return [ALL, ...CATEGORIES.filter((c) => set.has(c))];
  }, [projects]);

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  return (
    <section id="projetos" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-3">Portfólio</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">Projetos Selecionados</h2>
      </motion.div>

      {/* Airbnb-style category filter — horizontal scroll on mobile */}
      <div className="mb-10 -mx-6 md:mx-0 px-6 md:px-0 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 md:gap-3 md:flex-wrap min-w-max md:min-w-0">
          {availableCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full font-body text-sm tracking-wide whitespace-nowrap border transition-all duration-300 ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical stack per project card block — but per user request, horizontal scroll on mobile grouped by category when "Todos" */}
      {active === ALL ? (
        <div className="md:hidden space-y-12">
          {availableCategories
            .filter((c) => c !== ALL)
            .map((cat) => {
              const items = projects.filter((p) => p.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-display text-xl text-foreground">{cat}</h3>
                    <button
                      onClick={() => setActive(cat)}
                      className="font-body text-xs uppercase tracking-widest text-accent"
                    >
                      Ver todos
                    </button>
                  </div>
                  <div className="-mx-6 px-6 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-4 min-w-max pb-2">
                      {items.map((p, i) => (
                        <div key={p.id} className="w-64 flex-shrink-0">
                          <ProjectCard project={p} index={i} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
