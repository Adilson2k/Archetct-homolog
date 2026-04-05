import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { LayoutDashboard, FolderOpen, User, LogOut, Home, TrendingUp, Layers, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Projetos", icon: FolderOpen, path: "/admin/projetos" },
  { label: "Perfil", icon: User, path: "/admin/perfil" },
];

const AdminDashboard = () => {
  const { isAuthenticated, logout, projects } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const isActive = (path: string) => location.pathname === path;

  const stats = [
    { label: "Total Projetos", value: projects.length, icon: FolderOpen, trend: "+2 este mês" },
    { label: "Categorias", value: new Set(projects.map((p) => p.category)).size, icon: Layers, trend: `${new Set(projects.map((p) => p.category)).size} activas` },
    { label: "Último Ano", value: Math.max(...projects.map((p) => parseInt(p.year))), icon: Calendar, trend: "Actualizado" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(220 20% 6%)" }}>
      {/* Sidebar */}
      <aside className="w-[260px] flex flex-col border-r" style={{ background: "hsl(220 15% 8%)", borderColor: "hsl(220 12% 14%)" }}>
        <div className="p-6 border-b" style={{ borderColor: "hsl(220 12% 14%)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display text-sm font-bold" style={{ background: "linear-gradient(135deg, hsl(38 60% 52%), hsl(38 50% 42%))" }}>
              AM
            </div>
            <div>
              <p className="font-display text-sm" style={{ color: "hsl(40 15% 92%)" }}>AM Studio</p>
              <p className="font-body text-xs" style={{ color: "hsl(220 8% 45%)" }}>Painel Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <p className="px-3 py-2 font-body text-[10px] uppercase tracking-[0.15em] font-medium" style={{ color: "hsl(220 8% 40%)" }}>Menu</p>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all duration-200",
                isActive(item.path)
                  ? "font-medium"
                  : "hover:translate-x-0.5"
              )}
              style={
                isActive(item.path)
                  ? { background: "hsl(38 60% 52% / 0.12)", color: "hsl(38 60% 60%)" }
                  : { color: "hsl(220 8% 55%)" }
              }
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = "hsl(220 12% 14%)";
                  e.currentTarget.style.color = "hsl(40 15% 85%)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "hsl(220 8% 55%)";
                }
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t space-y-0.5" style={{ borderColor: "hsl(220 12% 14%)" }}>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all duration-200 hover:translate-x-0.5"
            style={{ color: "hsl(220 8% 55%)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(220 12% 14%)"; e.currentTarget.style.color = "hsl(40 15% 85%)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(220 8% 55%)"; }}
          >
            <Home size={18} />
            Ver Site
          </button>
          <button
            onClick={() => { logout(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all duration-200"
            style={{ color: "hsl(0 70% 55%)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(0 70% 55% / 0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 border-b px-8 py-4 backdrop-blur-xl" style={{ background: "hsl(220 20% 6% / 0.8)", borderColor: "hsl(220 12% 14%)" }}>
          <h1 className="font-display text-lg" style={{ color: "hsl(40 15% 92%)" }}>
            {location.pathname === "/admin" ? "Dashboard" : location.pathname.includes("projetos") ? "Projetos" : "Perfil"}
          </h1>
        </div>

        <div className="p-8">
          {location.pathname === "/admin" ? (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5" style={{ background: "hsl(220 15% 10%)", borderColor: "hsl(220 12% 16%)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "hsl(38 60% 52% / 0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "hsl(220 12% 16%)"; }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-body text-xs uppercase tracking-[0.15em] font-medium" style={{ color: "hsl(220 8% 45%)" }}>{stat.label}</p>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(38 60% 52% / 0.1)" }}>
                        <stat.icon size={15} style={{ color: "hsl(38 60% 55%)" }} />
                      </div>
                    </div>
                    <p className="font-display text-3xl" style={{ color: "hsl(40 15% 92%)" }}>{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={12} style={{ color: "hsl(142 60% 45%)" }} />
                      <span className="font-body text-xs" style={{ color: "hsl(220 8% 50%)" }}>{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent projects */}
              <div>
                <h2 className="font-display text-lg mb-4" style={{ color: "hsl(40 15% 92%)" }}>Projetos Recentes</h2>
                <div className="rounded-xl border overflow-hidden" style={{ background: "hsl(220 15% 10%)", borderColor: "hsl(220 12% 16%)" }}>
                  {projects.slice(0, 5).map((project, i) => (
                    <div key={project.id} className="flex items-center gap-4 px-5 py-3.5 transition-colors" style={{ borderBottom: i < 4 ? "1px solid hsl(220 12% 14%)" : "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(220 15% 12%)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <img src={project.image} alt={project.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm truncate" style={{ color: "hsl(40 15% 90%)" }}>{project.title}</p>
                        <p className="font-body text-xs" style={{ color: "hsl(220 8% 45%)" }}>{project.category}</p>
                      </div>
                      <span className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: "hsl(38 60% 52% / 0.1)", color: "hsl(38 60% 58%)" }}>{project.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
