import { useState } from "react";
import { useAdmin, Project } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

const emptyProject = { title: "", category: "", year: "", demo: "", image: "" };

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyProject);

  const handleSave = () => {
    if (editing) {
      updateProject(editing, form);
      setEditing(null);
    } else if (adding) {
      addProject({ ...form, image: form.image || "/placeholder.svg" });
      setAdding(false);
    }
    setForm(emptyProject);
  };

  const startEdit = (project: Project) => {
    setEditing(project.id);
    setAdding(false);
    setForm({ title: project.title, category: project.category, year: project.year, demo: project.demo, image: project.image });
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
    setForm(emptyProject);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-foreground">Projetos</h1>
        {!adding && !editing && (
          <Button onClick={() => { setAdding(true); setForm(emptyProject); }} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            <Plus size={16} /> Novo Projeto
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <div className="bg-secondary p-6 rounded border border-border mb-8 space-y-4">
          <h2 className="font-display text-xl text-foreground">{editing ? "Editar Projeto" : "Novo Projeto"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-background" />
            <Input placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-background" />
            <Input placeholder="Ano" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="bg-background" />
            <Input placeholder="Link Demo" value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} className="bg-background" />
            <Input placeholder="URL da Imagem" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="bg-background md:col-span-2" />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
              <Save size={16} /> Salvar
            </Button>
            <Button variant="outline" onClick={cancel} className="gap-2">
              <X size={16} /> Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center gap-4 bg-secondary p-4 rounded border border-border">
            <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-foreground truncate">{project.title}</p>
              <p className="font-body text-sm text-muted-foreground">{project.category} · {project.year}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => startEdit(project)}>
                <Pencil size={16} />
              </Button>
              <Button variant="outline" size="icon" onClick={() => deleteProject(project.id)} className="text-destructive hover:text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
