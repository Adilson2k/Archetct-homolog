import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, User, Mail, Phone, MapPin, Instagram, Linkedin, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProfile = () => {
  const { profile, updateProfile } = useAdmin();
  const [form, setForm] = useState(profile);
  const { toast } = useToast();

  useEffect(() => setForm(profile), [profile]);

  const handleSave = async () => {
    try {
      await updateProfile(form);
      toast({ title: "Perfil atualizado", description: "As informações foram salvas com sucesso." });
    } catch {
      toast({ title: "Não foi possível salvar", description: "Verifique a configuração e as permissões do Firebase.", variant: "destructive" });
    }
  };

  const inputStyle = { background: "hsl(220 20% 8%)", color: "hsl(40 15% 92%)", borderColor: "hsl(220 12% 18%)" };
  const labelStyle = { color: "hsl(220 8% 50%)" };

  const field = (label: string, key: keyof typeof form, icon: React.ReactNode, type = "text") => (
    <div key={key}>
      <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(220 8% 40%)" }}>{icon}</span>
        <Input
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="pl-10 h-10 border font-body"
          style={inputStyle}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl">
      {/* Personal info */}
      <div className="rounded-xl border p-6 mb-6" style={{ background: "hsl(220 15% 10%)", borderColor: "hsl(220 12% 16%)" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(38 60% 52% / 0.1)" }}>
            <User size={14} style={{ color: "hsl(38 60% 55%)" }} />
          </div>
          <h2 className="font-display text-lg" style={{ color: "hsl(40 15% 92%)" }}>Informações Pessoais</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("Nome", "name", <User size={15} />)}
          {field("Título", "title", <FileText size={15} />)}
          {field("Localização", "location", <MapPin size={15} />)}
          {field("Email", "email", <Mail size={15} />, "email")}
          {field("Telefone", "phone", <Phone size={15} />, "tel")}
          {field("Instagram", "instagram", <Instagram size={15} />, "url")}
          {field("LinkedIn", "linkedin", <Linkedin size={15} />, "url")}
        </div>
      </div>

      {/* Bio */}
      <div className="rounded-xl border p-6 mb-6" style={{ background: "hsl(220 15% 10%)", borderColor: "hsl(220 12% 16%)" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(38 60% 52% / 0.1)" }}>
            <FileText size={14} style={{ color: "hsl(38 60% 55%)" }} />
          </div>
          <h2 className="font-display text-lg" style={{ color: "hsl(40 15% 92%)" }}>Biografia</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>Parágrafo 1</label>
            <textarea
              value={form.bio1}
              onChange={(e) => setForm({ ...form, bio1: e.target.value })}
              rows={4}
              className="w-full rounded-lg border px-3 py-2.5 font-body text-sm focus:outline-none focus:ring-2 resize-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-body text-xs uppercase tracking-[0.12em] mb-1.5 block" style={labelStyle}>Parágrafo 2</label>
            <textarea
              value={form.bio2}
              onChange={(e) => setForm({ ...form, bio2: e.target.value })}
              rows={4}
              className="w-full rounded-lg border px-3 py-2.5 font-body text-sm focus:outline-none focus:ring-2 resize-none"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2 border-0 text-white font-body text-sm h-10 px-6 rounded-lg" style={{ background: "linear-gradient(135deg, hsl(38 60% 52%), hsl(38 50% 42%))" }}>
        <Save size={15} /> Salvar Alterações
      </Button>
    </div>
  );
};

export default AdminProfile;
