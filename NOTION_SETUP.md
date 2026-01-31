# Integração Notion CMS - Portfólio Dinâmico

## 📋 Visão Geral

Este guia explica como configurar o Notion como CMS para gerenciar os projetos do portfólio dinamicamente. Após a configuração, você poderá adicionar, editar e deletar projetos diretamente no Notion sem tocar no código.

---

## 🔑 Passo 1: Criar Integration no Notion

### 1.1 Acessar Notion Integrations
1. Acesse: https://www.notion.so/my-integrations
2. Clique em **"Create new integration"**
3. Preencha os dados:
   - **Name**: `Johnata Moreira Portfolio`
   - **Logo**: (opcional)
   - **Associated workspace**: Selecione seu workspace

### 1.2 Copiar Token
1. Após criar, clique na integration criada
2. Copie o **Internal Integration Token**
3. Guarde em local seguro (será usado como `NOTION_API_KEY`)

### 1.3 Configurar Capabilities
Certifique-se que as seguintes capabilities estão habilitadas:
- ✅ Read content
- ✅ Update content
- ✅ Insert content
- ✅ Delete content

---

## 📊 Passo 2: Criar Database no Notion

### 2.1 Criar Nova Database
1. No Notion, crie uma nova página
2. Adicione um banco de dados (Table)
3. Nomeie como: **Projects** (ou seu nome preferido)

### 2.2 Schema da Database

Configure as seguintes colunas:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| **Title** | Title | Nome do projeto |
| **Description** | Rich Text | Descrição curta (uma linha) |
| **Long Description** | Rich Text | Descrição completa |
| **Category** | Select | saas, web, mobile, traffic, infrastructure |
| **Status** | Select | production, development, archived |
| **Year** | Number | Ano do projeto |
| **Icon** | Text | Nome do ícone Lucide (ex: Code2, Zap) |
| **Tags** | Multi-select | Tags do projeto |
| **Technologies** | Multi-select | Tecnologias usadas |
| **Metrics** | Rich Text | JSON com métricas (ex: `[{"label":"Users","value":"1000+"}]`) |
| **Highlights** | Rich Text | JSON com destaques (ex: `["Destaque 1","Destaque 2"]`) |
| **Team** | Text | Nome do cliente/time |
| **Demo Link** | URL | Link para demo |
| **Website Link** | URL | Link do website |
| **GitHub Link** | URL | Link do GitHub |

### 2.3 Configurar Select Options

**Category:**
- saas
- web
- mobile
- traffic
- infrastructure

**Status:**
- production
- development
- archived

**Tags (Multi-select):**
- Web
- Mobile
- SaaS
- Fintech
- Real-time
- Analytics
- E-commerce
- DevOps
- IA
- Conversão
- (adicione conforme necessário)

---

## 🔗 Passo 3: Compartilhar Database com Integration

### 3.1 Dar Acesso à Integration
1. Abra a database **Projects** no Notion
2. Clique em **Share** (canto superior direito)
3. Clique em **Add guests**
4. Procure por sua integration (`Johnata Moreira Portfolio`)
5. Selecione e clique em **Invite**

### 3.2 Copiar Database ID
1. Abra a database no Notion
2. A URL será algo como: `https://www.notion.so/WORKSPACE_ID/DATABASE_ID?v=VIEW_ID`
3. Copie o `DATABASE_ID` (32 caracteres após o último `/`)
4. Guarde como `NOTION_DATABASE_ID`

---

## 🔐 Passo 4: Configurar Variáveis de Ambiente

### 4.1 Arquivo `.env.local`

Crie um arquivo `.env.local` na raiz do projeto com:

```env
VITE_NOTION_API_KEY=seu_token_aqui
VITE_NOTION_DATABASE_ID=seu_database_id_aqui
```

**Importante:** Estas variáveis serão expostas no frontend (prefixo `VITE_`), o que é aceitável para leitura pública. Para produção, considere usar um backend proxy.

---

## 📝 Passo 5: Adicionar Projetos no Notion

### 5.1 Exemplo de Projeto Completo

**Title:** Sistema de Gestão de Frotas

**Description:** Painel Web + App Mobile para controle logístico total

**Long Description:** Plataforma completa de gestão de frotas para o Grupo Paraopeba...

**Category:** web

**Status:** production

**Year:** 2024

**Icon:** Smartphone

**Tags:** Web, Mobile, Real-time

**Technologies:** React, Node.js, PostgreSQL, WebSocket, React Native, Google Maps

**Metrics:** 
```json
[
  {"label": "Frotas Gerenciadas", "value": "150+"},
  {"label": "Motoristas", "value": "500+"},
  {"label": "Redução de Custos", "value": "35%"}
]
```

**Highlights:**
```json
[
  "Dashboard em tempo real com WebSocket",
  "Rastreamento GPS com histórico de rotas",
  "Gestão de motoristas com documentação",
  "Análise de desempenho e custos"
]
```

**Team:** Grupo Paraopeba

**Demo Link:** https://exemplo.com/frotas

---

## 🔄 Passo 6: Integração no Código

O código já está configurado para buscar dados do Notion automaticamente. Basta:

1. Adicionar projetos no Notion
2. O site carregará os dados automaticamente
3. Sem necessidade de rebuild ou redeploy

### 6.1 Verificar Conexão

Após configurar as variáveis de ambiente:

```bash
# Restart do servidor
pnpm dev
```

Acesse `/portfolio` e verifique se os projetos aparecem.

---

## 🛠️ Troubleshooting

### Erro: "Notion API Key inválida"
- Verifique se o token foi copiado corretamente
- Certifique-se que não há espaços em branco
- Regenere o token se necessário

### Erro: "Database não encontrada"
- Verifique o Database ID
- Certifique-se que a integration tem acesso à database
- Verifique se o ID não tem hífens extras

### Projetos não aparecem
- Abra o console do navegador (F12) e verifique erros
- Verifique se os campos obrigatórios estão preenchidos
- Certifique-se que a categoria é uma das opções válidas

### Performance lenta
- Notion API tem rate limiting (3 requisições/segundo)
- Implemente cache no frontend (já configurado)
- Para produção, use um backend proxy

---

## 📚 Referências

- [Notion API Docs](https://developers.notion.com/)
- [Notion Integration Setup](https://developers.notion.com/docs/create-a-notion-integration)
- [Database Query API](https://developers.notion.com/reference/post-database-query)

---

## 🚀 Próximos Passos

1. **Cache Avançado**: Implementar cache com revalidação periódica
2. **Backend Proxy**: Criar endpoint backend para ocultar API key
3. **Webhooks**: Configurar webhooks do Notion para invalidar cache
4. **Admin Panel**: Criar painel de admin para gerenciar projetos sem Notion

---

**Versão**: 1.0.0  
**Data**: 31 de Janeiro de 2026
