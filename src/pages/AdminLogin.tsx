import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, KeyRound, ArrowRight } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/admin");
    } else {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(135deg, hsl(220 20% 6%), hsl(220 15% 12%), hsl(220 20% 6%))" }}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-2xl opacity-20 blur-xl" style={{ background: "linear-gradient(135deg, hsl(38 60% 52%), hsl(38 60% 52% / 0.3))" }} />

        <div className="relative rounded-2xl border p-8" style={{ background: "hsl(220 15% 10%)", borderColor: "hsl(220 12% 18%)" }}>
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(38 60% 52%), hsl(38 50% 42%))" }}>
              <Lock className="text-white" size={22} />
            </div>
            <h1 className="font-display text-2xl" style={{ color: "hsl(40 15% 92%)" }}>Painel Admin</h1>
            <p className="font-body text-sm mt-1" style={{ color: "hsl(220 8% 50%)" }}>Acesso restrito ao administrador</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(220 8% 40%)" }} />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11 border-0 font-body"
                style={{ background: "hsl(220 15% 14%)", color: "hsl(40 15% 92%)" }}
              />
            </div>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(220 8% 40%)" }} />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-11 border-0 font-body"
                style={{ background: "hsl(220 15% 14%)", color: "hsl(40 15% 92%)" }}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body" style={{ background: "hsl(0 62% 30% / 0.2)", color: "hsl(0 84% 60%)" }}>
                {error}
              </div>
            )}
            <Button type="submit" className="w-full h-11 border-0 font-body font-medium gap-2 text-white" style={{ background: "linear-gradient(135deg, hsl(38 60% 52%), hsl(38 50% 42%))" }}>
              Entrar <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center text-xs mt-6 font-body" style={{ color: "hsl(220 8% 40%)" }}>
            Demo: admin@almedino.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
