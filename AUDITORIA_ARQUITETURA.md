# Auditoria de Arquitetura - Zola Tech

Data: 2026-06-04

## Resumo executivo

O projeto e uma SPA React/Vite pequena, com Firebase Auth/Firestore e uma funcao de IA em `src/gemini.js`. A aplicacao compila, mas ainda nao esta pronta para producao real: ha segredo de IA exposto no frontend, `.env` rastreado pelo Git, ausencia de regras Firestore no repositorio, falta de testes, lint quebrado, componentes muito acoplados e um bundle inicial grande.

Nota geral da arquitetura: 4/10.

Nivel de prontidao para producao: baixo. Pode servir como prototipo/MVP local, mas nao deve ir para producao antes de corrigir seguranca, CI, regras Firebase, organizacao de dominio e qualidade minima.

Comandos executados:

```bash
npm ci
npm run lint
npm run build
```

Resultado:

- `npm ci`: sucesso, 0 vulnerabilidades reportadas pelo npm.
- `npm run lint`: falha com 2 erros e 1 warning.
- `npm run build`: sucesso, mas com warning de chunk maior que 500 kB.

## Problema 1 - Segredo de IA exposto e `.env` rastreado

Prioridade: Critico.

### Problema

O arquivo `.env` esta rastreado pelo Git, confirmado por `git ls-files .env`. Ele contem uma chave real de IA. Alem disso, `src/gemini.js` usa uma variavel `VITE_OPENROUTER_API_KEY` no browser:

- `.env`
- `src/gemini.js:13-14`

Em Vite, qualquer variavel com prefixo `VITE_` e exposta ao bundle do navegador. Isso significa que uma chave usada em requisicoes client-side nao e segredo.

### Impacto

Impacto atual: qualquer pessoa com acesso ao repositorio ou ao bundle pode extrair a chave.

Impacto futuro: uso indevido da chave, custos inesperados, bloqueio de conta do provedor, abuso por scripts automatizados e impossibilidade de aplicar rate limit real por usuario.

Risco financeiro: alto. APIs de IA podem gerar custos rapidamente.

Risco de manutencao: alto. A aplicacao mistura chamada de IA com UI/client, sem camada backend para auditoria, cache, limites ou logs controlados.

### Exemplo do problema

```js
// src/gemini.js:13-14
Authorization:
  `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
```

### Solucao recomendada

1. Rotacionar imediatamente a chave exposta.
2. Remover `.env` do Git.
3. Adicionar `.env` e `.env.*` ao `.gitignore`, mantendo somente `.env.example`.
4. Criar endpoint backend/serverless para chamadas de IA.
5. Aplicar validacao, rate limit, autenticacao e logs no backend.

### Exemplo refatorado

Frontend:

```js
export async function askAI(question) {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Falha ao consultar IA");
  }

  return response.json();
}
```

Backend/serverless:

```js
export async function POST(request) {
  const { question } = await request.json();

  if (!question || question.length > 2000) {
    return Response.json({ error: "Pergunta invalida" }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [{ role: "user", content: question }],
    }),
  });

  return Response.json(await response.json());
}
```

## Problema 2 - Firebase sem separacao por ambiente e sem regras no repo

Prioridade: Critico.

### Problema

A configuracao Firebase esta hardcoded em `src/firebase/firebase.js:9-16`. A chave `apiKey` do Firebase nao e um segredo do mesmo tipo que uma chave de IA, mas hardcoding impede ambientes separados e aumenta o risco de apontar desenvolvimento, staging e producao para o mesmo projeto.

Nao existe `firebase.json`, `firestore.rules` ou `storage.rules` no repositorio.

### Impacto

Impacto atual: nao da para auditar as permissoes reais do Firestore pelo codigo.

Impacto futuro: qualquer alteracao manual no console Firebase pode abrir leitura/escrita indevida. Equipes diferentes nao conseguem revisar regras via PR. Ambientes podem compartilhar dados por acidente.

Risco de seguranca: critico, porque o cliente escreve em `users/{uid}`.

Risco financeiro: medio/alto, se regras abertas permitirem leitura massiva.

### Exemplo do problema

```js
// src/firebase/firebase.js:9-16
const firebaseConfig = {
  apiKey: "...",
  authDomain: "zola-tech.firebaseapp.com",
  projectId: "zola-tech",
};
```

### Solucao recomendada

Mover configuracao para env publico controlado e versionar regras:

```js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

Regras minimas sugeridas para `users/{uid}`:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.keys().hasOnly(["name", "email", "createdAt"])
        && request.resource.data.email is string
        && request.resource.data.name is string;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false;
    }
  }
}
```

## Problema 3 - Escrita de perfil diretamente na UI

Prioridade: Alto.

### Problema

`RegisterPage.jsx` cria o usuario e grava o perfil no Firestore dentro do componente:

- `src/RegisterPage.jsx:43-56`

Isso mistura UI, Auth, persistencia e schema de dados.

### Impacto

Impacto atual: dificil testar e reaproveitar.

Impacto futuro: ao adicionar campos, roles, onboarding ou validacao, a tela de cadastro vira ponto central de regra de negocio. Tambem aumenta chance de schema inconsistente.

Risco de seguranca: medio/alto, porque o cliente decide quais campos gravar.

### Exemplo do problema

```js
await setDoc(doc(db, "users", user.uid), {
  name: name,
  email: email,
  createdAt: new Date(),
});
```

### Solucao recomendada

Criar uma camada de servico:

```js
// src/features/auth/services/registerUser.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

export async function registerUser({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: name.trim(),
    email: user.email,
    createdAt: serverTimestamp(),
  });

  return user;
}
```

## Problema 4 - Auth duplicado e contexto ausente

Prioridade: Alto.

### Problema

Auth e consultado em varios lugares:

- `src/App.jsx:12`
- `src/LoginPage.jsx:17`
- `src/RegisterPage.jsx:23`
- `src/Dashboard.jsx:82`

`ProtectedRoute` cria seu proprio listener em `App.jsx:19-26`, enquanto `Dashboard.jsx:96-112` depende de `auth.currentUser`.

### Impacto

Impacto atual: estados duplicados e dependencia de timing. `auth.currentUser` pode estar `null` no primeiro render mesmo com sessao valida.

Impacto futuro: ao crescer, cada tela tendera a reinventar loading, usuario, logout e erros.

Risco tecnico: medio/alto.

### Solucao recomendada

Criar `AuthProvider` e `useAuth`, expondo `user`, `loading`, `logout` e talvez `profile`.

```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, loading: true });

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setState({ user, loading: false });
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
```

## Problema 5 - `Dashboard.jsx` e um componente monolitico

Prioridade: Alto.

### Problema

`src/Dashboard.jsx` tem cerca de 19 KB e concentra:

- estruturas de dados demonstrativas (`TreeNode`, `LessonNode`, `Queue`, `Stack`) em `src/Dashboard.jsx:14-79`
- leitura Firestore em `src/Dashboard.jsx:96-112`
- logout em `src/Dashboard.jsx:144-148`
- arrays de cursos em `src/Dashboard.jsx:154-334`
- arrays de videos em `src/Dashboard.jsx:340-394`
- renderizacao completa em `src/Dashboard.jsx:397-613`
- estilos inline em `src/Dashboard.jsx:620+`

### Impacto

Impacto atual: qualquer mudanca no dashboard exige ler um arquivo grande e misturado.

Impacto futuro: conflitos de merge entre desenvolvedores, baixa testabilidade, acoplamento entre dados, UI e Firebase, dificuldade para paginar ou carregar cursos dinamicamente.

Risco de performance: medio. Os arrays e objetos de estilo sao recriados em todo render.

### Solucao recomendada

Separar em modulos:

```txt
src/features/dashboard/
  DashboardPage.jsx
  components/
    DashboardHeader.jsx
    CourseGrid.jsx
    CourseCard.jsx
    VideoGrid.jsx
    ProgressSummary.jsx
  data/
    courses.js
    videos.js
  hooks/
    useUserProfile.js
```

## Problema 6 - Dados de cursos hardcoded

Prioridade: Medio.

### Problema

Cursos e videos estao hardcoded dentro do componente.

### Impacto

Impacto atual: mudancas de conteudo exigem deploy.

Impacto futuro: nao existe CMS/admin, paginacao, filtro, controle de disponibilidade, localizacao, analytics ou conteudo por perfil.

Risco financeiro no Firebase: se migrar ingenuamente para `getDocs(collection(db, "courses"))` sem paginacao/cache, cada abertura do dashboard pode gerar leituras excessivas.

### Solucao recomendada

Comecar extraindo para arquivos `data/`. Depois mover para Firestore com pagina, cache e queries indexadas:

```js
query(
  collection(db, "courses"),
  where("published", "==", true),
  orderBy("createdAt", "desc"),
  limit(20)
);
```

## Problema 7 - Lint quebrado

Prioridade: Alto.

### Problema

`npm run lint` falha:

- `src/Dashboard.jsx:395`: `progress` declarado e nao usado.
- `src/main.jsx:1`: `React` importado e nao usado.
- `src/Dashboard.jsx:112`: warning de dependencia em `useEffect`.

### Impacto

Impacto atual: CI/CD com lint bloquearia deploy.

Impacto futuro: a equipe tende a ignorar o lint inteiro, permitindo acumulacao de problemas reais.

### Solucao recomendada

Remover imports/variaveis mortos e ajustar o efeito do dashboard para depender de um estado de auth vindo do contexto.

```jsx
// src/main.jsx
import ReactDOM from "react-dom/client";
```

## Problema 8 - Bundle inicial grande

Prioridade: Medio.

### Problema

Build gerou:

- `dist/assets/index-*.js`: 719.81 kB minificado, 223.52 kB gzip.
- `foto3.jpg`: 2.42 MB.
- Vite alertou chunk maior que 500 kB.

### Impacto

Impacto atual: carregamento inicial mais lento, especialmente em mobile.

Impacto futuro: cada nova dependencia/tela aumenta o custo da primeira visita.

### Solucao recomendada

Usar lazy routes:

```jsx
const LandingPage = lazy(() => import("./LandingPage.jsx"));
const LoginPage = lazy(() => import("./LoginPage.jsx"));
const RegisterPage = lazy(() => import("./RegisterPage.jsx"));
const Dashboard = lazy(() => import("./Dashboard.jsx"));
```

Otimizar imagens:

- converter imagens grandes para WebP/AVIF
- usar tamanhos responsivos
- evitar importar imagens pesadas no bundle quando puderem vir de `public/` ou CDN otimizada

## Problema 9 - IA inconsistente e dependencia inutil

Prioridade: Medio.

### Problema

`package.json:13` inclui `@google/generative-ai`, mas `src/gemini.js` chama OpenRouter com `VITE_OPENROUTER_API_KEY`. O `.env` usa outro nome de chave. Alem disso, `askAI` nao e usado em nenhuma tela.

### Impacto

Impacto atual: codigo morto e configuracao confusa.

Impacto futuro: desenvolvedores nao saberao qual provedor e oficial. Dependencias desnecessarias aumentam bundle/risco de manutencao.

### Solucao recomendada

Escolher um unico provedor, remover dependencia nao usada e criar contrato claro:

```txt
src/features/ai/
  api/askAi.js
  components/AiAssistant.jsx
```

## Problema 10 - CSS global conflita com estilos inline

Prioridade: Medio.

### Problema

`src/index.css` define tokens globais e estilos globais para `h1`, `h2`, `body`, `#root`, depois repete `html, body, #root` em `src/index.css:130-136`. `src/App.css` tambem define estilos globais para `body`, `h1`, `p`, `button`, mas nao aparece importado.

### Impacto

Impacto atual: comportamento visual dificil de prever.

Impacto futuro: uma mudanca global em `button` ou `h1` pode quebrar telas sem relacao.

### Solucao recomendada

Definir uma estrategia unica:

- `src/styles/global.css` para reset e tokens.
- CSS Modules, Tailwind, styled components ou classes por componente para UI.
- Remover `App.css` se nao for usado.

## Problema 11 - Acessibilidade fraca

Prioridade: Medio.

### Problema

Exemplos:

- `src/LandingPage.jsx:49`: imagem sem `alt`.
- Cards clicaveis em `src/Dashboard.jsx:532-547` e `src/Dashboard.jsx:571-586` sao `div` com `onClick`, sem teclado, role ou foco.
- Formularios usam `placeholder`, mas nao `label`.
- Feedback usa `alert()`.

### Impacto

Impacto atual: experiencia ruim para teclado, leitores de tela e usuarios com baixa visao.

Impacto futuro: dificil cumprir padroes de acessibilidade e qualidade.

### Solucao recomendada

Usar elementos semanticos:

```jsx
<a href={course.link} target="_blank" rel="noopener noreferrer" className="card">
  <span>{course.category}</span>
  <h3>{course.name}</h3>
</a>
```

E labels:

```jsx
<label htmlFor="email">Email</label>
<input id="email" type="email" autoComplete="email" />
```

## Problema 12 - `window.open` sem `noopener`

Prioridade: Medio.

### Problema

Links externos sao abertos via `window.open(url, "_blank")` em `src/Dashboard.jsx:543-546` e `src/Dashboard.jsx:582-585`.

### Impacto

Impacto atual: aba aberta pode acessar `window.opener` dependendo do navegador e contexto.

Impacto futuro: risco de tabnabbing e pior acessibilidade.

### Solucao recomendada

Preferir `<a target="_blank" rel="noopener noreferrer">`.

## Problema 13 - Validacao insuficiente no cadastro

Prioridade: Alto.

### Problema

`RegisterPage.jsx:33-36` valida somente campos vazios. Nao ha trim, politica clara de senha, validacao de nome, normalizacao de email ou tratamento de erros padronizado.

### Impacto

Impacto atual: dados inconsistentes entram no Firestore.

Impacto futuro: perfil, busca, mensagens e relatorios podem quebrar com dados ruins.

### Solucao recomendada

Adicionar validacao de schema:

```js
function validateRegisterInput({ name, email, password }) {
  if (name.trim().length < 2) return "Nome muito curto";
  if (!email.includes("@")) return "Email invalido";
  if (password.length < 8) return "Password deve ter pelo menos 8 caracteres";
  return null;
}
```

## Problema 14 - Falta de TypeScript ou contrato de dados

Prioridade: Medio.

### Problema

O projeto usa JavaScript com dados de usuario, cursos, videos e respostas de IA sem tipos ou schemas.

### Impacto

Impacto atual: erros aparecem em runtime.

Impacto futuro: com multiplos desenvolvedores, mudancas em campos como `name`, `email`, `createdAt`, `category` e `link` quebram telas silenciosamente.

### Solucao recomendada

Migrar gradualmente para TypeScript:

```ts
export type Course = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  externalUrl: string;
};
```

Se a migracao completa for pesada, usar JSDoc + Zod em fronteiras externas.

## Problema 15 - Ausencia de testes

Prioridade: Alto.

### Problema

Nao existem arquivos de teste, setup de Vitest/Testing Library ou testes de regras Firebase.

### Impacto

Impacto atual: cada refatoracao e manual.

Impacto futuro: regressao em auth, rotas protegidas, cadastro, dashboard e regras de dados.

### Solucao recomendada

Adicionar:

- Vitest + React Testing Library para componentes e hooks.
- Testes unitarios para validacao.
- Testes de regras Firestore com emulador.
- Smoke test de build no CI.

## Problema 16 - CI/CD ausente

Prioridade: Medio.

### Problema

Nao ha `.github/workflows` nem pipeline equivalente. O projeto depende de validacao manual.

### Impacto

Impacto atual: lint quebrado pode chegar ao deploy.

Impacto futuro: multiplos desenvolvedores vao introduzir variacoes sem barreira automatica.

### Solucao recomendada

Criar workflow:

```yaml
name: CI
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## Problema 17 - README e documentacao de projeto insuficientes

Prioridade: Baixo.

### Problema

`README.md` ainda e o texto do template Vite e tem caracteres nulos/encoding quebrado no fim.

### Impacto

Impacto atual: novo desenvolvedor nao sabe configurar Firebase, env, deploy ou arquitetura.

Impacto futuro: onboarding lento e configuracoes divergentes.

### Solucao recomendada

Documentar:

- requisitos de Node
- variaveis de ambiente
- scripts
- deploy
- Firebase project setup
- regras de seguranca
- estrutura de pastas

## Problema 18 - Encoding/textos corrompidos

Prioridade: Medio.

### Problema

Ha muitos textos renderizados com encoding quebrado, por exemplo `ProgramaÃ§Ã£o`, `DireÃ§Ã£o`, `JÃ¡ tenho conta`, `SessÃ£o`.

### Impacto

Impacto atual: UI parece quebrada para usuarios finais.

Impacto futuro: dificil buscar textos, traduzir ou manter conteudo.

### Solucao recomendada

Garantir arquivos em UTF-8 e corrigir strings. Depois centralizar textos em constantes ou i18n simples.

## Estrutura ideal sugerida

```txt
src/
  app/
    App.jsx
    routes.jsx
    providers.jsx
  lib/
    firebase/
      client.js
      auth.js
      firestore.js
  features/
    auth/
      components/
        LoginForm.jsx
        RegisterForm.jsx
      pages/
        LoginPage.jsx
        RegisterPage.jsx
      services/
        loginUser.js
        registerUser.js
      hooks/
        useAuth.js
    dashboard/
      pages/
        DashboardPage.jsx
      components/
        DashboardHeader.jsx
        ProgressSummary.jsx
        CourseGrid.jsx
        CourseCard.jsx
        VideoGrid.jsx
      data/
        courses.js
        videos.js
      hooks/
        useUserProfile.js
    landing/
      pages/
        LandingPage.jsx
      components/
        Hero.jsx
        TracksSection.jsx
  shared/
    components/
      Button.jsx
      TextField.jsx
      LoadingScreen.jsx
    styles/
      global.css
      tokens.css
    utils/
      errors.js
  tests/
firebase.json
firestore.rules
.env.example
```

## Roadmap de refatoracao priorizado

1. Rotacionar chave de IA, remover `.env` do Git e parar de chamar IA direto do browser.
2. Versionar `firestore.rules` e `firebase.json`.
3. Corrigir lint para desbloquear CI.
4. Criar `AuthProvider`/`useAuth`.
5. Extrair servicos Firebase para fora das telas.
6. Quebrar `Dashboard.jsx` em componentes, dados e hooks.
7. Aplicar lazy loading nas rotas.
8. Otimizar imagens grandes.
9. Corrigir encoding dos textos.
10. Adicionar testes de auth, cadastro, rotas protegidas e regras Firestore.
11. Criar CI.
12. Atualizar README.

## Melhorias rapidas com alto impacto

- Remover `import React from "react"` de `src/main.jsx`.
- Remover ou usar `progress` em `src/Dashboard.jsx:395-396`.
- Trocar `window.location.href = "/login"` por `navigate("/login")` apos logout.
- Corrigir `.gitignore` para ignorar `.env`.
- Criar `.env.example` sem valores reais.
- Remover `console.log` de producao.
- Adicionar `alt` em `LandingPage.jsx:49`.
- Trocar cards clicaveis por links semanticos.
- Remover `App.css` se nao for usado.
- Corrigir README.

## Melhorias criticas obrigatorias

- Rotacionar segredo de IA.
- Remover `.env` do repositorio e, se ja houve push, limpar historico.
- Mover chamada de IA para backend/serverless.
- Criar regras Firestore versionadas.
- Impedir escrita/leitura de perfis por usuarios errados.
- Criar CI com lint e build.

## O que refatorar imediatamente

- `src/gemini.js`: nao deve expor segredo no frontend.
- `src/firebase/firebase.js`: separar config por ambiente.
- `src/RegisterPage.jsx`: extrair auth/firestore para service.
- `src/App.jsx`: mover auth para provider.
- `src/Dashboard.jsx`: dividir em componentes e dados.

## O que pode gerar custos altos no Firebase futuramente

- Regras abertas de Firestore, se estiverem permissivas no console.
- Migrar cursos/videos para Firestore sem `limit`, paginacao e cache.
- Listeners realtime sem necessidade ou sem cleanup.
- Dashboard fazendo leituras repetidas de perfil/conteudo em cada render/entrada.
- Falta de App Check e rate limit para endpoints auxiliares.

## O que pode quebrar em escala

- Um unico `Dashboard.jsx` recebendo toda nova funcionalidade.
- Auth duplicado sem contexto global.
- Dados hardcoded sem fonte unica.
- Falta de tipos/schemas.
- Falta de testes e CI.
- Bundle inicial crescendo sem code splitting.
- Estilos globais e inline competindo.
- Falta de regras Firebase versionadas.

