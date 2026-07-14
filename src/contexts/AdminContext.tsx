import { createContext, useContext, useState, ReactNode } from "react";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";
import lavanderia1 from "@/assets/lavanderia-1.jpg.asset.json";
import lavanderia2 from "@/assets/lavanderia-2.jpg.asset.json";
import lavanderia3 from "@/assets/lavanderia-3.jpg.asset.json";
import residenciaAmarela from "@/assets/residencia-amarela.jpg.asset.json";
import residenciaVista from "@/assets/residencia-vista.jpg.asset.json";
import escritorioInterior from "@/assets/escritorio-interior.jpg.asset.json";

export const CATEGORIES = ["Residencial", "Comercial", "Interiores", "Institucional", "Hospitalidade", "Urbanismo"] as const;
export type Category = typeof CATEGORIES[number];

export interface Project {
  id: string;
  slug: string;
  image: string;
  gallery: string[];
  title: string;
  category: Category | string;
  year: string;
  description: string;
  location?: string;
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

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const defaultProjects: Project[] = [
  {
    id: "1",
    slug: "lavanderia-militar",
    image: lavanderia1.url,
    gallery: [lavanderia1.url, lavanderia2.url, lavanderia3.url],
    title: "Lavanderia Militar",
    category: "Institucional",
    year: "2025",
    description: "Projeto de uma lavanderia institucional destinada a instalações militares em Angola. A estrutura combina painéis vermelhos característicos com uma cobertura ampla que garante ventilação natural e proteção solar. O interior foi concebido para acomodar múltiplos postos de trabalho em bancadas de concreto polido, priorizando funcionalidade, higiene e durabilidade.",
    location: "Angola",
  },
  {
    id: "2",
    slug: "residencia-amarela",
    image: residenciaAmarela.url,
    gallery: [residenciaAmarela.url, residenciaVista.url],
    title: "Residência Amarela",
    category: "Residencial",
    year: "2025",
    description: "Residência de dois pavimentos com fachada contemporânea marcada por um volume amarelo em destaque, muro em pedra natural com iluminação embutida e portões em ripados de madeira e metal. O projeto explora o contraste entre materiais tradicionais e linhas modernas, criando uma presença urbana marcante ao entardecer.",
    location: "Angola",
  },
  {
    id: "3",
    slug: "escritorio-moderno",
    image: escritorioInterior.url,
    gallery: [escritorioInterior.url, project2],
    title: "Escritório Moderno",
    category: "Interiores",
    year: "2025",
    description: "Interior de escritório corporativo com estética contemporânea, piso em mármore, painéis ripados em madeira natural e iluminação linear suspensa. Um ambiente que equilibra produtividade e conforto, com áreas de trabalho colaborativo e um lounge acolhedor para pausas.",
    location: "Luanda",
  },
  {
    id: "4",
    slug: "residencia-iluminada",
    image: project3,
    gallery: [project3],
    title: "Residência Iluminada",
    category: "Residencial",
    year: "2024",
    description: "Residência unifamiliar com foco em iluminação natural. Grandes vãos e pé-direito duplo criam ambientes generosos e conectados ao exterior.",
    location: "Angola",
  },
  {
    id: "5",
    slug: "complexo-multiuso",
    image: project5,
    gallery: [project5],
    title: "Complexo Multiuso",
    category: "Comercial",
    year: "2024",
    description: "Complexo comercial multiuso com fachada moderna e integração de espaços comerciais e de lazer.",
    location: "Angola",
  },
  {
    id: "6",
    slug: "lounge-piscina",
    image: project6,
    gallery: [project6],
    title: "Lounge & Piscina",
    category: "Hospitalidade",
    year: "2024",
    description: "Área de lounge com piscina para empreendimento de hospitalidade, com deck em madeira e mobiliário integrado.",
    location: "Angola",
  },
  {
    id: "7",
    slug: "residencia-urbana",
    image: project7,
    gallery: [project7],
    title: "Residência Urbana",
    category: "Residencial",
    year: "2025",
    description: "Residência urbana com linhas limpas e materialidade contemporânea, priorizando privacidade e ventilação cruzada.",
    location: "Angola",
  },
  {
    id: "8",
    slug: "suite-contemporanea",
    image: project8,
    gallery: [project8],
    title: "Suite Contemporânea",
    category: "Interiores",
    year: "2025",
    description: "Design de interior para suite master com paleta neutra e detalhes em madeira.",
    location: "Angola",
  },
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
    const slug = project.slug || slugify(project.title || Date.now().toString());
    setProjects((prev) => [...prev, { ...project, slug, id: Date.now().toString() }]);
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, slug: data.slug || (data.title ? slugify(data.title) : p.slug) } : p))
    );
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
