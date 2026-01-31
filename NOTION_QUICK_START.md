# Notion CMS - Quick Start Guide

## ⚡ Setup Rápido (5 minutos)

### 1️⃣ Criar Integration Notion

```
1. Acesse: https://www.notion.so/my-integrations
2. Clique: "Create new integration"
3. Nome: "Johnata Moreira Portfolio"
4. Copie o token (começará com "secret_")
```

### 2️⃣ Criar Database no Notion

```
1. Crie uma nova página no Notion
2. Adicione uma "Database" (Table)
3. Nomeie como "Projects"
4. Configure os campos (veja schema abaixo)
```

### 3️⃣ Compartilhar Database com Integration

```
1. Abra a database "Projects"
2. Clique "Share" (canto superior direito)
3. Procure por "Johnata Moreira Portfolio"
4. Clique "Invite"
```

### 4️⃣ Copiar Database ID

```
URL do Notion: https://www.notion.so/WORKSPACE_ID/DATABASE_ID?v=VIEW_ID
Copie apenas o DATABASE_ID (32 caracteres)
```

### 5️⃣ Configurar Variáveis de Ambiente

```bash
# Copie .env.local.example para .env.local
cp .env.local.example .env.local

# Edite .env.local com seus valores:
VITE_NOTION_API_KEY=seu_token_aqui
VITE_NOTION_DATABASE_ID=seu_database_id_aqui
```

### 6️⃣ Restart do Servidor

```bash
# Restart para carregar as novas variáveis
pnpm dev
```

---

## 📊 Schema da Database Notion

### Campos Obrigatórios

| Campo | Tipo | Exemplo |
|-------|------|---------|
| **Title** | Title | "Sistema de Gestão de Frotas" |
| **Description** | Rich Text | "Painel Web + App Mobile" |
| **Category** | Select | saas, web, mobile, traffic, infrastructure |
| **Status** | Select | production, development, archived |

### Campos Opcionais

| Campo | Tipo | Exemplo |
|-------|------|---------|
| Long Description | Rich Text | Descrição completa do projeto |
| Year | Number | 2024 |
| Icon | Text | Code2, Zap, Smartphone (nomes Lucide) |
| Tags | Multi-select | Web, Mobile, Real-time |
| Technologies | Multi-select | React, Node.js, PostgreSQL |
| Metrics | Rich Text | `[{"label":"Users","value":"1000+"}]` |
| Highlights | Rich Text | `["Destaque 1","Destaque 2"]` |
| Team | Text | "Grupo Paraopeba" |
| Demo Link | URL | https://exemplo.com/demo |
| Website Link | URL | https://exemplo.com |
| GitHub Link | URL | https://github.com/usuario/repo |

---

## ✅ Verificar Conexão

### No Console do Navegador (F12)

```javascript
// Abra o console e execute:
// Se aparecer "Dados sincronizados com Notion CMS" = ✅ Funcionando
// Se aparecer erro = ❌ Verifique as variáveis de ambiente
```

### Checklist

- [ ] Token copiado corretamente (sem espaços)
- [ ] Database ID copiado corretamente
- [ ] Integration tem acesso à database
- [ ] Arquivo `.env.local` criado e preenchido
- [ ] Servidor reiniciado após configurar `.env.local`
- [ ] Projeto adicionado à database com campos obrigatórios

---

## 🎯 Adicionar Primeiro Projeto

### Exemplo Completo

**Title:** Sistema de Gestão de Frotas

**Description:** Painel Web + App Mobile para controle logístico total

**Category:** web

**Status:** production

**Long Description:** Plataforma completa de gestão de frotas para o Grupo Paraopeba. Sistema web responsivo com dashboard em tempo real, rastreamento GPS de veículos, gestão de motoristas, análise de rotas otimizadas e relatórios detalhados de desempenho.

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

## 🔄 Fluxo de Atualização

```
1. Adicione/edite projeto no Notion
2. Aguarde 5 segundos (cache)
3. Atualize a página do portfólio
4. Projeto aparece automaticamente ✨
```

---

## 🛠️ Troubleshooting

### "Notion não configurado"
- Verifique se `.env.local` existe
- Verifique se as variáveis estão preenchidas
- Restart do servidor

### "Erro ao conectar com Notion API"
- Verifique o token (deve começar com "secret_")
- Verifique o Database ID (32 caracteres)
- Certifique-se que a integration tem acesso

### Projetos não aparecem
- Verifique se os campos obrigatórios estão preenchidos
- Verifique se Status não é "archived"
- Abra console (F12) e procure por erros

### Performance lenta
- Notion API tem rate limiting (3 req/seg)
- Cache é de 5 minutos por padrão
- Para produção, considere backend proxy

---

## 📚 Ícones Disponíveis (Lucide)

Alguns ícones populares:
- `Code2` - Código
- `Zap` - Lightning/Energy
- `Smartphone` - Mobile
- `TrendingUp` - Gráfico
- `BarChart3` - Analytics
- `Network` - Infraestrutura
- `ShoppingCart` - E-commerce
- `Activity` - Fitness/Activity
- `Briefcase` - Trabalho

[Ver todos em: https://lucide.dev](https://lucide.dev)

---

## 🚀 Próximos Passos

1. **Backend Proxy**: Criar endpoint backend para ocultar API key
2. **Webhooks**: Configurar webhooks do Notion para cache em tempo real
3. **Admin Panel**: Painel de admin para gerenciar sem Notion
4. **Imagens**: Adicionar suporte a imagens dos projetos

---

**Versão**: 1.0.0  
**Última atualização**: 31 de Janeiro de 2026
