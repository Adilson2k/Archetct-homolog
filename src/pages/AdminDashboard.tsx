import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { LayoutDashboard, FolderOpen, User, LogOut, Home } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <p className="font-display text-lg text-foreground tracking-wider">AM Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded font-body text-sm transition-colors",
                isActive(item.path)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded font-body text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Home size={18} />
            Ver Site
          </button>
          <button
            onClick={() => { logout(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded font-body text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {location.pathname === "/admin" ? (
          <div>
            <h1 className="font-display text-3xl text-foreground mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-secondary p-6 rounded border border-border">
                <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">Projetos</p>
                <p className="font-display text-4xl text-foreground mt-2">{projects.length}</p>
              </div>
              <div className="bg-secondary p-6 rounded border border-border">
                <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">Categorias</p>
                <p className="font-display text-4xl text-foreground mt-2">
                  {new Set(projects.map((p) => p.category)).size}
                </p>
              </div>
              <div className="bg-secondary p-6 rounded border border-border">
                <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">Último Ano</p>
                <p className="font-display text-4xl text-foreground mt-2">
                  {Math.max(...projects.map((p) => parseInt(p.year)))}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
