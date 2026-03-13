import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProfile = () => {
  const { profile, updateProfile } = useAdmin();
  const [form, setForm] = useState(profile);
  const { toast } = useToast();

  useEffect(() => setForm(profile), [profile]);

  const handleSave = () => {
    updateProfile(form);
    toast({ title: "Perfil atualizado", description: "As informações foram salvas com sucesso." });
  };

  const field = (label: string, key: keyof typeof form, type = "text") => (
    <div key={key}>
      <label className="font-body text-sm text-muted-foreground uppercase tracking-widest block mb-2">{label}</label>
      <Input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="bg-background"
      />
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Perfil</h1>

      <div className="bg-secondary p-6 rounded border border-border space-y-6 max-w-2xl">
        <h2 className="font-display text-xl text-foreground">Informações Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("Nome", "name")}
          {field("Título", "title")}
          {field("Localização", "location")}
          {field("Email", "email", "email")}
          {field("Telefone", "phone", "tel")}
          {field("Instagram", "instagram", "url")}
          {field("LinkedIn", "linkedin", "url")}
        </div>

        <div>
          <label className="font-body text-sm text-muted-foreground uppercase tracking-widest block mb-2">Bio (Parágrafo 1)</label>
          <textarea
            value={form.bio1}
            onChange={(e) => setForm({ ...form, bio1: e.target.value })}
            rows={4}
            className="w-full bg-background border border-input rounded-md px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground uppercase tracking-widest block mb-2">Bio (Parágrafo 2)</label>
          <textarea
            value={form.bio2}
            onChange={(e) => setForm({ ...form, bio2: e.target.value })}
            rows={4}
            className="w-full bg-background border border-input rounded-md px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Save size={16} /> Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default AdminProfile;
