# Esportiva Tracker

Sistema profissional de tracking de eventos e campanhas desenvolvido com Next.js, Prisma e PostgreSQL.

## Funcionalidades

- **API de Tracking**: Endpoint GET para receber eventos via URL
- **Dashboard Interativo**: Visualização de estatísticas e eventos
- **Filtros Avançados**: Filtre por campanha, link, data e busca por texto
- **Estatísticas em Tempo Real**: Total de eventos, valores, campanhas e links únicos
- **Paginação**: Navegação eficiente por grandes volumes de dados
- **Captura Automática**: IP e User-Agent são salvos automaticamente
- **Design Responsivo**: Interface moderna e adaptável

## Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Validação**: Zod
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel

## Estrutura do Projeto

```
esportiva-tracker/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── track/         # Endpoint de tracking
│   │   │   ├── events/        # API de eventos
│   │   │   ├── stats/         # API de estatísticas
│   │   │   ├── campaigns/     # API de campanhas
│   │   │   └── links/         # API de links
│   │   ├── dashboard/         # Página do dashboard
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página inicial
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── StatsCard.tsx
│   │   ├── EventsTable.tsx
│   │   ├── Filters.tsx
│   │   └── Pagination.tsx
│   ├── lib/                   # Utilitários e configurações
│   │   ├── prisma.ts
│   │   ├── validators.ts
│   │   ├── utils.ts
│   │   └── logger.ts
│   ├── repositories/          # Camada de acesso a dados
│   │   └── tracking-event.repository.ts
│   ├── services/              # Lógica de negócio
│   │   └── tracking.service.ts
│   └── types/                 # Definições de tipos
│       └── index.ts
├── .env                       # Variáveis de ambiente (local)
├── .env.example               # Exemplo de variáveis
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Instalação e Configuração

### 1. Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

### 2. Clonar e instalar dependências

```bash
# Instalar dependências
npm install
```

### 3. Configurar banco de dados

Edite o arquivo `.env` com suas credenciais do PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/esportiva_tracker?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Executar migrations do Prisma

```bash
# Criar o banco de dados e tabelas
npx prisma db push

# Ou usar migrations (recomendado para produção)
npx prisma migrate dev --name init

# Gerar o Prisma Client
npx prisma generate
```

### 5. Rodar o projeto localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

## Deploy na Vercel

### 1. Preparar o banco de dados

Você pode usar:
- **Vercel Postgres** (recomendado)
- **Supabase**
- **Railway**
- **Neon**
- Qualquer PostgreSQL hospedado

### 2. Deploy via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

### 3. Deploy via GitHub

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure a variável de ambiente `DATABASE_URL`
5. Deploy automático

### 4. Configurar variáveis de ambiente na Vercel

No painel da Vercel, adicione:

```
DATABASE_URL=postgresql://user:password@host:5432/database
NEXT_PUBLIC_APP_URL=https://seudominio.vercel.app
```

### 5. Executar migrations em produção

Após o primeiro deploy:

```bash
# Via Vercel CLI
vercel env pull .env.production
npx prisma db push
```

Ou configure um script de build que execute `prisma generate` automaticamente (já configurado no `package.json`).

## Uso da API

### Endpoint de Tracking

**URL**: `GET /api/track`

**Parâmetros obrigatórios**:
- `linkname`: Nome do link (string)
- `nomecampanha`: Nome da campanha (string)
- `valor`: Valor numérico (string/number)
- `dataRegistro`: Data no formato YYYY-MM-DD ou ISO 8601

**Exemplo**:
```
https://seudominio.com/api/track?linkname=canal_a&nomecampanha=campanha_teste&valor=40&dataRegistro=2026-03-12
```

**Resposta de sucesso**:
```json
{
  "success": true,
  "message": "Evento registrado com sucesso",
  "data": {
    "id": "123",
    "link_name": "canal_a",
    "campaign_name": "campanha_teste",
    "value": 40,
    "registration_date": "2026-03-12T00:00:00.000Z",
    "created_at": "2026-03-12T10:30:00.000Z"
  }
}
```

**Resposta de erro**:
```json
{
  "success": false,
  "error": "Dados inválidos",
  "details": [
    {
      "field": "valor",
      "message": "Valor deve ser um número válido"
    }
  ]
}
```

### Outros Endpoints

- `GET /api/events` - Lista eventos com filtros e paginação
- `GET /api/stats` - Retorna estatísticas agregadas
- `GET /api/campaigns` - Lista campanhas únicas
- `GET /api/links` - Lista links únicos

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Gerar Prisma Client
npm run prisma:generate

# Criar migration
npm run prisma:migrate

# Push schema para o banco
npm run prisma:push

# Abrir Prisma Studio
npm run prisma:studio
```

## Banco de Dados

### Schema

```prisma
model TrackingEvent {
  id                BigInt   @id @default(autoincrement())
  link_name         String   @db.VarChar(255)
  campaign_name     String   @db.VarChar(255)
  value             Decimal  @db.Decimal(10, 2)
  registration_date DateTime
  ip                String?  @db.VarChar(45)
  user_agent        String?  @db.Text
  created_at        DateTime @default(now())

  @@index([campaign_name])
  @@index([link_name])
  @@index([registration_date])
  @@index([created_at])
  @@map("tracking_events")
}
```

## Arquitetura

O projeto segue uma arquitetura em camadas:

1. **API Routes** (`src/app/api/*`): Endpoints HTTP
2. **Services** (`src/services/*`): Lógica de negócio
3. **Repositories** (`src/repositories/*`): Acesso a dados
4. **Lib** (`src/lib/*`): Utilitários e configurações
5. **Components** (`src/components/*`): Componentes React
6. **Types** (`src/types/*`): Definições TypeScript

## Segurança

- Validação de entrada com Zod
- Sanitização de dados
- Logs estruturados
- Tratamento de erros robusto
- Proteção contra SQL Injection (via Prisma)

## Performance

- Índices no banco de dados para queries rápidas
- Paginação eficiente
- Cache de conexão do Prisma
- Otimizações do Next.js (SSR, ISR)

## Monitoramento

Os logs são estruturados e incluem:
- Timestamp
- Nível (info, warn, error, debug)
- Mensagem
- Dados contextuais

## Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar rate limiting
- [ ] Adicionar gráficos e visualizações
- [ ] Exportação de dados (CSV, Excel)
- [ ] Webhooks para notificações
- [ ] API de relatórios customizados

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## Licença

MIT
