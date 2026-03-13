import { createContext, useContext, useState, ReactNode } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";

export interface Project {
  id: string;
  image: string;
  title: string;
  category: string;
  year: string;
  demo: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  linkedin: string;
  bio1: string;
  bio2: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  profile: ProfileInfo;
  updateProfile: (info: Partial<ProfileInfo>) => void;
}

const defaultProjects: Project[] = [
  { id: "1", image: project1, title: "Sakura Garden", category: "Comercial", year: "2025", demo: "https://example.com/sakura-garden" },
  { id: "2", image: project2, title: "Escritório Moderno", category: "Interiores", year: "2025", demo: "https://example.com/escritorio-moderno" },
  { id: "3", image: project3, title: "Residência Iluminada", category: "Residencial", year: "2024", demo: "https://example.com/residencia-iluminada" },
  { id: "4", image: project4, title: "Sakura Garden — Vista Aérea", category: "Comercial", year: "2025", demo: "https://example.com/sakura-garden-aerea" },
  { id: "5", image: project5, title: "Complexo Multiuso", category: "Comercial", year: "2024", demo: "https://example.com/complexo-multiuso" },
  { id: "6", image: project6, title: "Lounge & Piscina", category: "Hospitalidade", year: "2024", demo: "https://example.com/lounge-piscina" },
  { id: "7", image: project7, title: "Residência Urbana", category: "Residencial", year: "2025", demo: "https://example.com/residencia-urbana" },
  { id: "8", image: project8, title: "Suite Contemporânea", category: "Interiores", year: "2025", demo: "https://example.com/suite-contemporanea" },
];

const defaultProfile: ProfileInfo = {
  name: "Almedino Mabiel",
  title: "Arquitecto · Angola",
  location: "Angola",
  email: "almedinomabiel@gmail.com",
  phone: "+244 941 949 095",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
  bio1: "Almedino Mabiel é um jovem arquitecto angolano, actualmente estudante de Arquitectura, com uma visão ousada e contemporânea. Apesar de ainda estar em formação, já acumula projectos notáveis que revelam maturidade técnica e uma sensibilidade estética invulgar.",
  bio2: "Apaixonado por design funcional e sustentável, Almedino acredita que a arquitectura tem o poder de transformar comunidades. Os seus projectos combinam influências africanas com linhas modernas, criando espaços únicos que contam histórias e conectam pessoas.",
};

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [profile, setProfile] = useState<ProfileInfo>(defaultProfile);

  const login = (email: string, password: string) => {
    if (email === "admin@almedino.com" && password === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const addProject = (project: Omit<Project, "id">) => {
    setProjects((prev) => [...prev, { ...project, id: Date.now().toString() }]);
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProfile = (info: Partial<ProfileInfo>) => {
    setProfile((prev) => ({ ...prev, ...info }));
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, projects, addProject, updateProject, deleteProject, profile, updateProfile }}>
      {children}
    </AdminContext.Provider>
  );
};
