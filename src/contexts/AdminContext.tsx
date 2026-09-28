import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, writeBatch } from "firebase/firestore";
import { upload } from "@vercel/blob/client";
import { firebaseAuth, firebaseConfigured, firestore } from "@/lib/firebase";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";
const lavanderia1 = { url: "/assets/lavanderia-1.jpg" };
const lavanderia2 = { url: "/assets/lavanderia-2.jpg" };
const lavanderia3 = { url: "/assets/lavanderia-3.jpg" };
const residenciaAmarela = { url: "/assets/residencia-amarela.jpg" };
const residenciaVista = { url: "/assets/residencia-vista.jpg" };
const escritorioInterior = { url: "/assets/escritorio-interior.jpg" };

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
  firebaseConfigured: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  uploadProjectImages: (files: File[]) => Promise<string[]>;
  profile: ProfileInfo;
  updateProfile: (info: Partial<ProfileInfo>) => Promise<void>;
}

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const ADMIN_EMAIL = "almedino.arch@gmail.com";

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

  useEffect(() => {
    if (!firebaseAuth || !firestore) return;

    return onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const token = await user.getIdTokenResult();
        const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL && token.claims.email_verified === true;
        setIsAuthenticated(isAdmin);
        if (!isAdmin) return;
        await seedInitialContent(user);
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Unable to initialize portfolio content", error);
      }
    });
  }, []);

  useEffect(() => {
    if (!firestore) return;

    const unsubscribeProjects = onSnapshot(collection(firestore, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map((projectDoc) => ({ ...projectDoc.data(), id: projectDoc.id }) as Project));
    }, (error) => console.error("Unable to load portfolio projects", error));

    const unsubscribeProfile = onSnapshot(doc(firestore, "site", "profile"), (snapshot) => {
      setProfile(snapshot.exists() ? { ...defaultProfile, ...snapshot.data() } as ProfileInfo : defaultProfile);
    }, (error) => console.error("Unable to load portfolio profile", error));

    return () => {
      unsubscribeProjects();
      unsubscribeProfile();
    };
  }, []);

  const seedInitialContent = async (user: User) => {
    if (!firestore) return;
    const token = await user.getIdTokenResult();
    if (user.email?.toLowerCase() !== ADMIN_EMAIL || token.claims.email_verified !== true) return;

    const [projectSnapshot, profileSnapshot] = await Promise.all([
      getDocs(collection(firestore, "projects")),
      getDoc(doc(firestore, "site", "profile")),
    ]);
    const batch = writeBatch(firestore);
    let hasChanges = false;

    if (projectSnapshot.empty) {
      defaultProjects.forEach((project) => {
        batch.set(doc(firestore, "projects", project.id), project);
      });
      hasChanges = true;
    }
    if (!profileSnapshot.exists()) {
      batch.set(doc(firestore, "site", "profile"), defaultProfile);
      hasChanges = true;
    }
    if (hasChanges) await batch.commit();
  };

  const login = async (email: string, password: string) => {
    if (!firebaseAuth) return false;
    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const token = await credential.user.getIdTokenResult();
      const isAdmin = credential.user.email?.toLowerCase() === ADMIN_EMAIL && token.claims.email_verified === true;
      if (!isAdmin) {
        await signOut(firebaseAuth);
        return false;
      }
      setIsAuthenticated(true);
      await seedInitialContent(credential.user);
      return true;
    } catch {
      setIsAuthenticated(false);
      await signOut(firebaseAuth);
      return false;
    }
  };

  const logout = async () => {
    if (firebaseAuth) await signOut(firebaseAuth);
  };

  const requireFirestore = () => {
    if (!firestore) throw new Error("Firebase não está configurado.");
    return firestore;
  };

  const addProject = async (project: Omit<Project, "id">) => {
    const slug = project.slug || slugify(project.title || Date.now().toString());
    const id = doc(collection(requireFirestore(), "projects")).id;
    await setDoc(doc(requireFirestore(), "projects", id), { ...project, slug, id });
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    const currentProject = projects.find((project) => project.id === id);
    const slug = data.slug || (data.title ? slugify(data.title) : currentProject?.slug);
    await setDoc(doc(requireFirestore(), "projects", id), { ...data, ...(slug ? { slug } : {}), id }, { merge: true });
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(requireFirestore(), "projects", id));
  };

  const uploadProjectImages = async (files: File[]) => {
    const user = firebaseAuth?.currentUser;
    if (!user || !isAuthenticated || user.email?.toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("Apenas o administrador autorizado pode enviar imagens.");
    }
    const clientPayload = await user.getIdToken();

    const blobs = await Promise.all(files.map((file) => upload(
      `projects/${crypto.randomUUID()}/${file.name}`,
      file,
      {
        access: "public",
        handleUploadUrl: "/api/upload",
        clientPayload,
      },
    )));

    return blobs.map((blob) => blob.url);
  };

  const updateProfile = async (info: Partial<ProfileInfo>) => {
    await setDoc(doc(requireFirestore(), "site", "profile"), { ...profile, ...info });
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, firebaseConfigured, login, logout, projects, addProject, updateProject, deleteProject, uploadProjectImages, profile, updateProfile }}>
      {children}
    </AdminContext.Provider>
  );
};
