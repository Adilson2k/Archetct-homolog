# Portfolio de Arquitectura

## Firebase

O portfolio usa Firebase Authentication para o painel e Cloud Firestore para projetos e perfil. Sem configuração Firebase, o site público continua a apresentar o conteúdo de demonstração, mas o painel não aceita autenticação.

Os uploads de imagens usam Vercel Blob. Configure `BLOB_READ_WRITE_TOKEN` nas variáveis do projeto Vercel (Production, Preview e Development, conforme necessário) e localmente no `.env`. A rota `/api/upload` valida o ID token Firebase e permite somente o e-mail verificado `almedino.arch@gmail.com`; aceita JPEG, PNG, WebP, GIF e AVIF até 15 MB. O painel permite enviar múltiplas imagens por projeto e adiciona os links à galeria do projeto.

1. Crie um projeto Firebase, ative Authentication com Email/Password e crie o banco Cloud Firestore.
2. Copie `.env.example` para `.env.local` e preencha as credenciais do app Web do Firebase.
3. Publique `firestore.rules` no Firestore Rules.
4. Em Firebase Authentication, crie apenas o utilizador `almedino.arch@gmail.com` e verifique esse endereço. As regras e a função de upload recusam todos os outros e-mails, mesmo que tenham sido criados no Firebase.
5. Execute `vercel dev` para testar o painel e os uploads localmente. O comando `npm run dev` inicia apenas o Vite e não serve a função `/api/upload`.

Para provisionar ou corrigir a conta localmente, coloque a senha em `.private/admin-credentials.md` e a service account na raiz do projeto com o nome `*firebase-adminsdk*.json`; depois execute `npm run provision:admin`. O comando cria a conta caso não exista ou atualiza sua senha e marca o e-mail como verificado. Nunca faça commit desses arquivos.

No primeiro login autorizado, projetos e perfil de demonstração são criados no Firestore caso ainda não existam. Os uploads de imagem vão para o Vercel Blob e as URLs são gravadas no campo `gallery` do projeto.

## Desenvolvimento

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
