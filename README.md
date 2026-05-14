# Scapini Track AI

> O novo TMS inteligente da Scapini Transportes — criado para substituir o Rota Livre e centralizar
> operação, rastreamento por etapas, integração com rastreadores de terceiros, controle de última milha,
> portal do cliente, app do motorista e IA preditiva.

Este repositório contém o **protótipo funcional em frontend** do Scapini Track AI, com dados mockados
realistas, rotas navegáveis e componentes reaproveitáveis. Não há backend real, integrações fiscais
reais nem APIs externas de produção — todas as interações são simuladas para fins de demonstração.

---

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- React Router v6
- Recharts (gráficos)
- Lucide React (ícones)

---

## Como executar localmente

```bash
npm install
npm run dev       # ambiente de desenvolvimento — http://localhost:5173
npm run build     # build de produção
npm run preview   # serve o build localmente
```

Compatível com Node 18+.

---

## Deploy na Vercel

O projeto já está configurado para deploy na Vercel com `vercel.json`.

### Opção 1 — Deploy via Git (recomendado)

1. Faça push do repositório para o GitHub/GitLab/Bitbucket.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.
3. A Vercel detecta automaticamente:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Clique em **Deploy**. Pronto.

### Opção 2 — Deploy via CLI

```bash
npm install -g vercel
vercel login
vercel              # primeiro deploy (preview)
vercel --prod       # deploy de produção
```

### O que o `vercel.json` faz

- **`framework: "vite"`** — usa o preset oficial do Vite na Vercel.
- **`rewrites`** — todas as rotas (`/operacao/dashboard`, `/cliente/dashboard`, etc.) caem em `/` para o React Router funcionar como SPA (sem 404 ao dar refresh).
- **`headers`** — cache imutável de 1 ano para `/assets/*` (JS, CSS e imagens já com hash no nome).
- **`cleanUrls: true`** — URLs limpas sem `.html`.

### Variáveis de ambiente

Não há variáveis obrigatórias — o protótipo roda 100% com dados mockados em memória.

Se no futuro houver backend, defina em **Project Settings → Environment Variables** na Vercel, no padrão `VITE_API_URL=https://...` (precisa do prefixo `VITE_` para o Vite expor ao client).

---

## Estrutura

```
src/
  main.tsx
  App.tsx                    # roteamento
  index.css                  # Tailwind + tokens
  context/AppContext.tsx     # perfil de demonstração (operador / gestor / cliente / motorista / admin / TI)
  data/
    types.ts                 # tipos
    mockData.ts              # dados mockados realistas
  components/
    layout/                  # AppShell, Sidebar, Header, PageTitle, ClientShell
    ui/                      # MetricCard, StatusBadge, RiskBadge, TrackingSourceBadge,
                             # TrackingScore, DataTable, FilterBar, MockMap, Timeline,
                             # LogisticLegTimeline, AIAlertCard, ChatPanel, Modal, Drawer,
                             # EmptyState, ProgressBar, KPIGrid, DeviceStatusCard, ...
    mobile/MobileFrame.tsx   # frame iPhone-like para o app do motorista
  pages/
    auth/        login, recuperação de senha
    home/        seleção de áreas
    operacao/    dashboard, coletas, ordens, etapas, programação, expedição,
                 liberação de viagem, rastreabilidade, mapa, eventos por filial,
                 cargas em transferência, última milha, entregas, ocorrências,
                 documentos fiscais, devices, comprovantes
    cliente/     portal: login, rastreio, dashboard, entrega, notificações, API
    motorista/   app: login, início, rota, entrega, ocorrência, confirmar entrega, chat
    ia/          alertas, assistente cliente, assistente operação, configurações
    migracao/    dashboard, importação, de-para de campos, de-para de status,
                 inconsistências, plano de go-live
    cadastros/   clientes, remetentes, destinatários, veículos, motoristas,
                 filiais e CDs, terceiros (com política de rastreamento)
    comercial/   tabelas de frete, simulação de frete
    financeiro/  faturamento
    relatorios/  dashboard analítico (Recharts)
    integracoes/ rastreadores de terceiros (API)
    admin/       usuários, integrações, status & eventos, geofences, templates,
                 auditoria LGPD, configurações operacionais, configurações fiscais
    design-system/  guia visual
```

---

## Conceitos principais

### Tracking por etapa logística (pernas)

Cada ordem pode ter múltiplas **pernas logísticas** (coleta → transferência → cross-docking →
longo percurso → distribuição local → última milha → reentrega → devolução), cada uma com sua
**fonte de rastreamento** independente:

- **GPS próprio** (frota Scapini)
- **API rastreador terceiro** (Onixsat, Sascar, Autotrac, Maxtrack)
- **App do motorista**
- **Link temporário** (WhatsApp)
- **Device físico** colocado na carga
- **Apenas eventos** (entrada/saída de filial)
- **Atualização manual** (fallback)
- **Exceção aprovada** por gestor

### Score de rastreabilidade

Cada viagem recebe um **score de 0 a 100** que combina as fontes ativas. A liberação de viagem
exige um **score mínimo** configurável — abaixo disso a carga é bloqueada até vincular device,
ativar API, enviar link ou aprovar exceção.

### Eventos de filial/CD (modelo Mercado Livre)

Quando não há rastreamento em tempo real, o sistema usa **eventos de entrada e saída** em filiais
e CDs para manter visibilidade. Cliente recebe linguagem amigável (“Sua entrega saiu de Curitiba/PR
e está em transferência para Florianópolis/SC”) sem expor localização exata.

### Cliente vs Operação

- **Cliente** vê eventos amigáveis, janelas de horário e comprovantes.
- **Operação** vê score, fonte de rastreamento, divergências, terceiros problemáticos e alertas da IA.

### IA preditiva

- Cálculo de **ETA** com janela de confiança.
- **Risco de atraso** (baixo / médio / alto) com explicação.
- **Alertas inteligentes**: terceiro sem sinal, device com bateria baixa, divergência GPS x device,
  terceiro reincidente em falhas, ETA instável, rota fora do padrão.
- Assistente para cliente e para operação.

---

## Perfis de demonstração

Use a tela `/login` para entrar como qualquer um dos perfis abaixo, ou alterne pelo dropdown
do header:

- **Operador** (Marina Schneider)
- **Gestor** (Lucas Scapini)
- **Cliente** (Cláudia Tavares — Mercado Exemplo)
- **Motorista** (João Pereira)
- **Administrador** (Henrique Costa)
- **TI / Integrações** (Fernanda Lima)

---

## Migração do Rota Livre

A área `/migracao` reúne todo o processo de virada:

- Painel com progresso por categoria
- Importação por CSV, XML, banco de dados ou API
- De-para de campos e status
- Inconsistências e tratativa
- Plano de go-live com etapas

> O Scapini Track AI **substitui** o Rota Livre. Não é uma camada por cima — é o novo TMS.

---

## Roadmap pós-protótipo

1. Backend Node/Postgres com Prisma
2. Integração real com SEFAZ (CT-e/MDF-e)
3. APIs reais de rastreadores (Onixsat, Sascar etc.)
4. Pipeline de IA (ETA + risco)
5. App nativo do motorista (React Native / Expo)
6. Webhooks reais para clientes corporativos

---

© 2026 Scapini Transportes · Scapini Track AI — TMS Inteligente
