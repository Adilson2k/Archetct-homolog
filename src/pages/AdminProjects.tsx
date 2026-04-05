import { useState } from "react";
import { useAdmin, Project } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, X, Save, ExternalLink, Image } from "lucide-react";

const categories = ["Residencial", "Comercial", "Interiores", "Hospitalidade", "Institucional", "Urbanismo"];

const emptyProject = { title: "", category: "", year: "", demo: "", image: "" };

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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

  const inputStyle = { background: "hsl(220 20% 8%)", color: "hsl(40 15% 92%)", borderColor: "hsl(220 12% 18%)" };
  const labelStyle = { color: "hsl(220 8% 50%)" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-body text-sm" style={{ color: "hsl(220 8% 50%)" }}>{projects.length} projetos no portfólio</p>
        </div>
        {!adding && !editing && (
          <Button
            onClick={() => { setAdding(true); setForm(emptyProject); }}
            className="gap-2 border-0 text-white font-body text-sm h-10 px-5 rounded-lg"
            style={{ background: "linear-gradient(135deg, hsl(38 60% 52%), hsl(38 50% 42%))" }}
          >
            <Plus size={16} /> Novo Projeto
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <div className="rounded-xl border p-6 mb-6 space-y-5" style={{ background: "hsl(220 15% 10%)", borderColor: "hsl(220 12% 16%)" }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(38 60% 52% / 0.1)" }}>
              {editing ? <Pencil size={14} style={{ color: "hsl(38 60% 55%)" }} /> : <Plus size={14} style={{ color: "hsl(38 60% 55%)" }} />}
            </div>
            <h2 className="font-display text-lg" style={{ color: "hsl(40 15% 92%)" }}>{editing ? "Editar Projeto" : "Novo Projeto"}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>Título</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-10 border font-body" style={inputStyle} />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>Categoria</label>
              <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
                <SelectTrigger className="h-10 border font-body" style={inputStyle}>
                  <SelectValue placeholder="Selecionar categoria" />
                </SelectTrigger>
                <SelectContent style={{ background: "hsl(220 15% 12%)", borderColor: "hsl(220 12% 18%)" }}>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="font-body text-sm cursor-pointer" style={{ color: "hsl(40 15% 85%)" }}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>Ano</label>
              <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="h-10 border font-body" style={inputStyle} />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>Link Demo</label>
              <Input value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} className="h-10 border font-body" style={inputStyle} />
            </div>
            <div className="md:col-span-2">
              <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>URL da Imagem</label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="h-10 border font-body" style={inputStyle} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} className="gap-2 border-0 text-white font-body text-sm h-10 px-5 rounded-lg" style={{ background: "linear-gradient(135deg, hsl(38 60% 52%), hsl(38 50% 42%))" }}>
              <Save size={15} /> Salvar
            </Button>
            <Button onClick={cancel} className="gap-2 font-body text-sm h-10 px-5 rounded-lg border" style={{ background: "transparent", color: "hsl(220 8% 55%)", borderColor: "hsl(220 12% 20%)" }}>
              <X size={15} /> Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-xl border overflow-hidden" style={{ background: "hsl(220 15% 10%)", borderColor: "hsl(220 12% 16%)" }}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="flex items-center gap-4 px-5 py-4 transition-colors group"
            style={{ borderBottom: i < projects.length - 1 ? "1px solid hsl(220 12% 14%)" : "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(220 15% 12%)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <img src={project.image} alt={project.title} className="w-14 h-14 rounded-lg object-cover border" style={{ borderColor: "hsl(220 12% 18%)" }} />
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-medium truncate" style={{ color: "hsl(40 15% 90%)" }}>{project.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(38 60% 52% / 0.1)", color: "hsl(38 60% 58%)" }}>{project.category}</span>
                <span className="font-body text-xs" style={{ color: "hsl(220 8% 40%)" }}>· {project.year}</span>
              </div>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "hsl(220 8% 50%)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(220 12% 16%)"; e.currentTarget.style.color = "hsl(40 15% 85%)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(220 8% 50%)"; }}
                >
                  <ExternalLink size={15} />
                </a>
              )}
              <button onClick={() => startEdit(project)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "hsl(220 8% 50%)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(220 12% 16%)"; e.currentTarget.style.color = "hsl(40 15% 85%)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(220 8% 50%)"; }}
              >
                <Pencil size={15} />
              </button>
              {deleteConfirm === project.id ? (
                <div className="flex gap-1">
                  <button onClick={() => { deleteProject(project.id); setDeleteConfirm(null); }} className="px-2 h-8 rounded-lg flex items-center justify-center text-xs font-body transition-colors" style={{ background: "hsl(0 70% 55% / 0.15)", color: "hsl(0 70% 60%)" }}>
                    Sim
                  </button>
                  <button onClick={() => setDeleteConfirm(null)} className="px-2 h-8 rounded-lg flex items-center justify-center text-xs font-body" style={{ color: "hsl(220 8% 50%)" }}>
                    Não
                  </button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(project.id)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "hsl(0 60% 50%)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(0 70% 55% / 0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
