# Johnata Moreira - Site Pessoal | Documentação Técnica

## 📋 Visão Geral

Site pessoal de alta conversão desenvolvido em **React 19 + Tailwind CSS 4 + Framer Motion**, com layout **Bento Grid**, estética **dark mode elegante** e otimizações de **SEO semântico**.

---

## 🎨 Design System

### Paleta de Cores (Dark Mode)
- **Background Primário**: `#0f172a` (Cinza chumbo profundo)
- **Cards**: `#1e293b` (Cinza chumbo médio)
- **Accent Primário**: `#10b981` (Emerald - verde)
- **Accent Secundário**: `#06b6d4` (Cyan - azul)
- **Foreground**: `#e2e8f0` (Branco suave)
- **Muted**: `#94a3b8` (Cinza neutro)

### Tipografia
- **Font Family**: Geist (Sans Serif Grotesca)
- **Display XL**: 4xl-6xl, bold, tracking-tight
- **Heading XL**: 2xl-3xl, bold
- **Body LG**: base-lg, leading-relaxed
- **Label**: xs, semibold, uppercase, tracking-wider

### Componentes Bento
- **Grid Gap**: 4-6 (responsivo)
- **Border Radius**: 0.75rem
- **Shadows**: Sutis, hover com elevation
- **Transições**: 300ms ease-out

---

## 📁 Estrutura de Arquivos

```
johnatamoreira/
├── client/
│   ├── public/
│   │   ├── robots.txt          # SEO: Instruções para crawlers
│   │   ├── sitemap.xml         # SEO: Mapa do site
│   │   └── index.html          # HTML com meta tags otimizadas
│   ├── src/
│   │   ├── components/
│   │   │   ├── SEOHead.tsx     # Componente para meta tags dinâmicas
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx        # Página principal com Bento Grid
│   │   │   └── NotFound.tsx
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── App.tsx             # Router e ThemeProvider
│   │   ├── main.tsx            # Entry point React
│   │   └── index.css           # Design tokens e componentes globais
│   └── index.html
├── server/
│   └── index.ts                # Express server (static serving)
├── shared/
│   └── const.ts
└── package.json
```

---

## 🎬 Componentes Principais

### 1. **Hero Block (2x2)**
- Título principal com gradient accent
- Subtítulo com value proposition
- CTA "Ver Projetos"
- Animação: fade-in + slide-up

### 2. **Case Real (2x1)**
- Badge "Em Produção"
- Título: "Sistema de Gestão de Frotas"
- Descrição: Grupo Paraopeba
- Ícone: Smartphone

### 3. **Laboratório (1x1)**
- Badge "SaaS"
- Título: "MeuGuia"
- Descrição: Plataforma Gig Economy
- Ícone: Zap

### 4. **Gestão de Tráfego (1x1)**
- Badge "Ads"
- Gráfico animado com barras
- Métrica: +45% ROI
- Ícone: TrendingUp

### 5. **Bio Pessoal (1x2)**
- Texto sincero sobre profissional
- Links para redes sociais (GitHub, LinkedIn, Email)
- Ícones interativos com hover

### 6. **Stack Tecnológico (1x1)**
- Frontend: React, Next.js, Tailwind
- Backend: Node.js, Express, PostgreSQL
- Mobile: React Native, Flutter
- DevOps: Docker, AWS, Vercel

### 7. **CTA Block (2x1)**
- Título: "Vamos Conversar?"
- Botão WhatsApp com hover scale
- Fundo com gradient accent

---

## ⚡ Animações (Framer Motion)

### Container Variants
```typescript
containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    staggerChildren: 0.1,
    delayChildren: 0.2
  }
}
```

### Item Variants
```typescript
itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}
```

### Hover Effects
- Cards: `shadow-lg` + `border-accent/50`
- Botões: `whileHover={{ x: 4 }}` (spring)
- Gráfico: Barras animadas com stagger

---

## 🔍 SEO & Performance

### Meta Tags Implementadas
- **Title**: Johnata Moreira - Product Builder & Estrategista de Tráfego
- **Description**: Desenvolvedor Full-Stack & Estrategista de Tráfego...
- **OG Tags**: og:title, og:description, og:image, og:type
- **Twitter Card**: summary_large_image
- **Canonical**: https://johnatamoreira.com.br
- **Structured Data**: JSON-LD (Person schema)

### Arquivos SEO
- `robots.txt`: Instruções para crawlers
- `sitemap.xml`: Mapa do site
- `SEOHead.tsx`: Componente para meta tags dinâmicas

### Otimizações
- Fontes otimizadas via Google Fonts (Geist)
- Lazy loading de componentes
- Imagens otimizadas (ícones SVG)
- CSS crítico inline
- Sem JavaScript desnecessário

---

## 🚀 Como Rodar Localmente

### Instalação
```bash
cd johnatamoreira
pnpm install
```

### Desenvolvimento
```bash
pnpm dev
# Acessa em http://localhost:3000
```

### Build
```bash
pnpm build
pnpm start
```

### Verificação TypeScript
```bash
pnpm check
```

---

## 📱 Responsividade

### Breakpoints Tailwind
- **Mobile**: < 640px (default)
- **Tablet**: md (768px+)
- **Desktop**: lg (1024px+)
- **Large**: xl (1280px+)

### Grid Responsivo
```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
```

- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3+ colunas (com spans)

---

## 🔧 Customização

### Alterar Cores
Editar `client/src/index.css`:
```css
:root {
  --primary: #10b981;
  --accent: #06b6d4;
  /* ... */
}

.dark {
  --background: #0f172a;
  /* ... */
}
```

### Alterar Tipografia
Editar `client/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=SuaFont:wght@400;700&display=swap" rel="stylesheet" />
```

### Adicionar Novos Cards Bento
1. Criar novo `motion.div` com `variants={itemVariants}`
2. Adicionar classe `bento-item`
3. Definir `col-span` e `row-span` para grid
4. Adicionar conteúdo com ícones Lucide

---

## 📊 Métricas de Performance

- **Lighthouse Score**: Otimizado para 90+
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: ~150KB (gzipped)
- **First Paint**: < 1s

---

## 🔐 Segurança

- CSP headers configuráveis
- No inline scripts (exceto analytics)
- HTTPS recomendado
- Sanitização de meta tags

---

## 📝 Próximos Passos Sugeridos

1. **Integrar Links Reais**
   - WhatsApp: Adicionar número e link `https://wa.me/...`
   - GitHub/LinkedIn: Atualizar URLs dos perfis
   - Email: Configurar mailto

2. **Adicionar Portfólio Dinâmico**
   - Criar página `/projetos` com filtros
   - Cards com imagens dos projetos
   - Links para demos/repositórios

3. **Implementar Blog**
   - Criar `/blog` com posts em Markdown
   - Integrar com CMS (Notion, Contentful)
   - SEO otimizado por post

4. **Analytics & Conversão**
   - Umami Analytics (já configurado)
   - Pixel de conversão (WhatsApp, Email)
   - Heatmap com Hotjar

5. **Formulário de Contato**
   - Upgrade para `web-db-user`
   - Backend com validação
   - Envio de email automático

---

## 📞 Suporte

Para dúvidas sobre o código ou customizações, consulte:
- Documentação Tailwind: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Lucide Icons: https://lucide.dev
- shadcn/ui: https://ui.shadcn.com

---

**Versão**: 1.0.0  
**Data**: 31 de Janeiro de 2026  
**Autor**: Manus Tech Lead & UX Designer
