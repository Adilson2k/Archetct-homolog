import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectRoot = process.cwd();
const email = "almedino.arch@gmail.com";
const credentialsPath = resolve(projectRoot, ".private/admin-credentials.md");
const credentialNote = await readFile(credentialsPath, "utf8");
const password = credentialNote.match(/^- Senha: (.+)$/m)?.[1];

if (!password) {
  throw new Error("A senha não foi encontrada em .private/admin-credentials.md.");
}

const rootFiles = await readdir(projectRoot);
const serviceAccountFile = rootFiles.find((file) => file.includes("firebase-adminsdk") && file.endsWith(".json"));
if (!serviceAccountFile) {
  throw new Error("Não foi encontrada uma service account *firebase-adminsdk*.json na raiz.");
}

const serviceAccount = JSON.parse(await readFile(resolve(projectRoot, serviceAccountFile), "utf8"));
if (serviceAccount.project_id !== "almedino-arch") {
  throw new Error("A service account não pertence ao projeto Firebase almedino-arch.");
}

const app = getApps()[0] ?? initializeApp({ credential: cert(serviceAccount) });
const auth = getAuth(app);

let user;
try {
  const existingUser = await auth.getUserByEmail(email);
  user = await auth.updateUser(existingUser.uid, {
    password,
    emailVerified: true,
    disabled: false,
  });
  console.log(`Conta administrativa atualizada e e-mail verificado: ${user.email}`);
} catch (error) {
  if (error.code !== "auth/user-not-found") throw error;
  user = await auth.createUser({ email, password, emailVerified: true });
  console.log(`Conta administrativa criada e e-mail verificado: ${user.email}`);
}
