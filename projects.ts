export type ProjectCategory = "saas" | "web" | "mobile" | "traffic" | "infrastructure";
export type ProjectStatus = "production" | "development" | "archived";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  image?: string;
  icon: string;
  tags: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  links?: {
    demo?: string;
    github?: string;
    website?: string;
  };
  team?: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "gestao-frotas",
    title: "Sistema de Gestão de Frotas",
    description: "Painel Web + App Mobile para controle logístico total",
    longDescription: "Plataforma completa de gestão de frotas para o Grupo Paraopeba. Sistema web responsivo com dashboard em tempo real, rastreamento GPS de veículos, gestão de motoristas, análise de rotas otimizadas e relatórios detalhados de desempenho.",
    category: "web",
    status: "production",
    year: 2024,
    icon: "Smartphone",
    tags: ["Web", "Mobile", "Real-time"],
    metrics: [
      { label: "Frotas Gerenciadas", value: "150+" },
      { label: "Motoristas", value: "500+" },
      { label: "Redução de Custos", value: "35%" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "WebSocket", "React Native", "Google Maps"],
    links: {
      demo: "https://exemplo.com/frotas",
    },
    team: "Grupo Paraopeba",
    highlights: [
      "Dashboard em tempo real com WebSocket",
      "Rastreamento GPS com histórico de rotas",
      "Gestão de motoristas com documentação",
      "Análise de desempenho e custos",
      "App mobile nativo para motoristas",
      "Integração com sistemas legados",
    ],
  },
  {
    id: "meiguia-saas",
    title: "MeuGuia - SaaS Gig Economy",
    description: "Plataforma de gestão financeira e operacional para motoristas",
    longDescription: "Aplicação SaaS em desenvolvimento focada na Gig Economy. Ferramenta completa para motoristas de aplicativo gerenciarem finanças, rotas, documentação e performance. Inclui dashboard analítico, integração com APIs de apps de transporte e relatórios fiscais.",
    category: "saas",
    status: "development",
    year: 2025,
    icon: "Zap",
    tags: ["SaaS", "Fintech", "Mobile"],
    metrics: [
      { label: "Beta Users", value: "50+" },
      { label: "Economia Média", value: "R$ 2.5k/mês" },
    ],
    technologies: ["Next.js", "React Native", "Stripe", "PostgreSQL", "Redis", "AWS"],
    links: {
      website: "https://meiguia.com",
    },
    highlights: [
      "Dashboard financeiro com previsões",
      "Integração com APIs de apps de transporte",
      "Gestão de documentos e licenças",
      "Relatórios fiscais automáticos",
      "Comunidade de motoristas",
      "Análise de rentabilidade por rota",
    ],
  },
  {
    id: "ads-management",
    title: "Gestão de Tráfego Pago",
    description: "Estratégia e otimização de ROI em campanhas de ads",
    longDescription: "Serviço especializado de gestão de tráfego pago para imobiliárias e e-commerces. Otimização de campanhas em Google Ads, Facebook/Instagram e TikTok com foco em ROI. Análise contínua de performance e ajustes estratégicos.",
    category: "traffic",
    status: "production",
    year: 2023,
    icon: "TrendingUp",
    tags: ["Marketing", "Analytics", "Ads"],
    metrics: [
      { label: "Clientes Ativos", value: "15+" },
      { label: "ROI Médio", value: "+45%" },
      { label: "Budget Gerenciado", value: "R$ 500k+/mês" },
    ],
    technologies: ["Google Ads API", "Facebook Ads API", "Python", "Tableau", "Google Analytics"],
    highlights: [
      "Otimização contínua de campanhas",
      "Análise de concorrência",
      "Relatórios personalizados",
      "Testes A/B estruturados",
      "Gestão de budget inteligente",
      "Integração com CRM",
    ],
  },
  {
    id: "landing-pages",
    title: "Landing Pages de Alta Conversão",
    description: "Desenvolvimento de páginas otimizadas para conversão",
    longDescription: "Criação de landing pages responsivas e otimizadas para conversão. Cada página é desenvolvida com foco em UX, copywriting persuasivo e testes A/B. Integração com ferramentas de analytics e CRM.",
    category: "web",
    status: "production",
    year: 2024,
    icon: "Code2",
    tags: ["Web", "Design", "Conversão"],
    metrics: [
      { label: "Taxa Média de Conversão", value: "8.5%" },
      { label: "Páginas Criadas", value: "25+" },
    ],
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vercel", "Google Analytics"],
    highlights: [
      "Design responsivo e moderno",
      "Otimização de performance",
      "Testes A/B integrados",
      "SEO on-page",
      "Integração com ferramentas de email",
      "Análise de heatmap",
    ],
  },
  {
    id: "ecommerce-platform",
    title: "Plataforma E-commerce",
    description: "Sistema completo de e-commerce com checkout otimizado",
    longDescription: "Plataforma e-commerce full-stack com catálogo de produtos, carrinho inteligente, checkout seguro com múltiplos pagamentos e painel administrativo. Integração com sistemas de logística e ERP.",
    category: "web",
    status: "production",
    year: 2023,
    icon: "ShoppingCart",
    tags: ["E-commerce", "Pagamentos", "Backend"],
    metrics: [
      { label: "Transações/Mês", value: "5k+" },
      { label: "Ticket Médio", value: "R$ 350" },
      { label: "Taxa de Abandono", value: "12%" },
    ],
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Docker", "AWS S3"],
    links: {
      demo: "https://exemplo.com/ecommerce",
    },
    highlights: [
      "Checkout em 1 clique",
      "Múltiplas formas de pagamento",
      "Integração com transportadoras",
      "Painel administrativo completo",
      "Relatórios de vendas",
      "Sistema de avaliações",
    ],
  },
  {
    id: "mobile-app-fitness",
    title: "App Mobile - Fitness Tracker",
    description: "Aplicativo nativo para rastreamento de atividades físicas",
    longDescription: "Aplicativo mobile nativo (iOS e Android) para rastreamento de atividades físicas. Integração com sensores do dispositivo, sincronização com wearables e análise de progresso com IA.",
    category: "mobile",
    status: "production",
    year: 2024,
    icon: "Activity",
    tags: ["Mobile", "Fitness", "IA"],
    metrics: [
      { label: "Downloads", value: "50k+" },
      { label: "Rating", value: "4.8★" },
      { label: "Usuários Ativos", value: "15k" },
    ],
    technologies: ["React Native", "Firebase", "TensorFlow Lite", "Apple HealthKit", "Google Fit"],
    links: {
      github: "https://github.com/johnatamoreira/fitness-app",
    },
    highlights: [
      "Rastreamento em tempo real",
      "Análise de progresso com gráficos",
      "Desafios e competições",
      "Integração com wearables",
      "Sincronização na nuvem",
      "Modo offline",
    ],
  },
  {
    id: "api-gateway",
    title: "API Gateway & Microserviços",
    description: "Arquitetura escalável de microserviços com API Gateway",
    longDescription: "Implementação de arquitetura de microserviços com API Gateway, autenticação OAuth2, rate limiting e monitoramento. Sistema preparado para escalar com Docker e Kubernetes.",
    category: "infrastructure",
    status: "production",
    year: 2024,
    icon: "Network",
    tags: ["Backend", "DevOps", "Arquitetura"],
    metrics: [
      { label: "Requisições/Dia", value: "10M+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Latência P95", value: "120ms" },
    ],
    technologies: ["Node.js", "Express", "Docker", "Kubernetes", "Redis", "PostgreSQL", "Prometheus"],
    highlights: [
      "Rate limiting inteligente",
      "Autenticação OAuth2",
      "Logging centralizado",
      "Monitoramento em tempo real",
      "Auto-scaling",
      "Circuit breaker pattern",
    ],
  },
  {
    id: "dashboard-analytics",
    title: "Dashboard Analytics Avançado",
    description: "Painel de análise em tempo real com visualizações interativas",
    longDescription: "Dashboard executivo com visualizações interativas de dados em tempo real. Integração com múltiplas fontes de dados, gráficos customizáveis e exportação de relatórios.",
    category: "web",
    status: "production",
    year: 2024,
    icon: "BarChart3",
    tags: ["Analytics", "Dashboard", "Data Viz"],
    metrics: [
      { label: "Usuários", value: "200+" },
      { label: "Dados Processados", value: "1TB+/mês" },
    ],
    technologies: ["React", "Recharts", "PostgreSQL", "GraphQL", "WebSocket", "Tailwind CSS"],
    highlights: [
      "Gráficos em tempo real",
      "Filtros avançados",
      "Exportação de dados",
      "Alertas automáticos",
      "Dashboards customizáveis",
      "Integração com APIs externas",
    ],
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((p) => p.status === status);
}

export function getAllCategories(): ProjectCategory[] {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories) as ProjectCategory[];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function filterProjects(
  category?: ProjectCategory,
  tag?: string,
  status?: ProjectStatus
): Project[] {
  return projects.filter((p) => {
    if (category && p.category !== category) return false;
    if (tag && !p.tags.includes(tag)) return false;
    if (status && p.status !== status) return false;
    return true;
  });
}
