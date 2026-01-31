import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ArrowLeft, Briefcase, AlertCircle, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { ProjectFilters } from "@/components/ProjectFilters";
import { ProjectCard } from "@/components/ProjectCard";
import {
  getAllCategories,
  getAllTags,
  filterProjects,
  ProjectCategory,
} from "@/lib/projects";
import { useAllProjects } from "@/hooks/useProjects";

/**
 * Design System: Página de Portfólio
 * - Integração Notion CMS para gerenciar projetos dinamicamente
 * - Fallback para dados locais se Notion não estiver configurado
 * - Layout: Sidebar com filtros (mobile: top), grid de projetos
 * - Filtros: Categoria, Tags, com botão de limpar
 * - Cards: Expandíveis, com métricas, tecnologias e links
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export default function Portfolio() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | undefined>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  // Buscar projetos do Notion com fallback para dados locais
  const { projects, loading, error, isUsingNotion } = useAllProjects();

  // Extrair categorias e tags dos projetos carregados
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats) as ProjectCategory[];
  }, [projects]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    return result;
  }, [selectedCategory, selectedTag, projects]);

  const categoryLabels: Record<ProjectCategory, string> = {
    saas: "SaaS",
    web: "Web",
    mobile: "Mobile",
    traffic: "Tráfego",
    infrastructure: "Infraestrutura",
  };

  // Calcular estatísticas
  const stats = useMemo(
    () => ({
      total: projects.length,
      production: projects.filter((p) => p.status === "production").length,
      categories: categories.length,
      technologies: new Set(projects.flatMap((p) => p.technologies)).size,
    }),
    [projects, categories]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Portfólio - Johnata Moreira"
        description="Conheça meus projetos: SaaS, Web, Mobile, Gestão de Tráfego e Infraestrutura. Casos de sucesso em produção."
        canonical="https://johnatamoreira.com.br/portfolio"
        ogTitle="Portfólio - Johnata Moreira"
        ogDescription="Projetos de sucesso em SaaS, Web, Mobile e Gestão de Tráfego"
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      >
        <div className="container flex items-center justify-between h-16">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="body-sm font-medium">Voltar</span>
          </motion.button>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-accent" />
            <h1 className="heading-md">Portfólio</h1>
          </div>
          <div className="w-20" />
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="container py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="display-lg mb-4">Meus Projetos</h2>
          <p className="body-lg text-muted-foreground max-w-2xl">
            Aqui estão alguns dos projetos que desenvolvi. Cada um representa um desafio único,
            soluções inovadoras e resultados mensuráveis. Clique em qualquer projeto para ver
            mais detalhes.
          </p>
          {isUsingNotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-2 text-xs text-accent"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Dados sincronizados com Notion CMS
            </motion.div>
          )}
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="body-sm font-medium text-yellow-500">Aviso</p>
              <p className="body-sm text-yellow-500/80">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <p className="body-md text-muted-foreground">Carregando projetos...</p>
          </motion.div>
        )}

        {/* Layout: Filters + Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <ProjectFilters
                  categories={categories}
                  tags={tags}
                  selectedCategory={selectedCategory}
                  selectedTag={selectedTag}
                  onCategoryChange={setSelectedCategory}
                  onTagChange={setSelectedTag}
                />
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Filters */}
              <div className="lg:hidden mb-8">
                <ProjectFilters
                  categories={categories}
                  tags={tags}
                  selectedCategory={selectedCategory}
                  selectedTag={selectedTag}
                  onCategoryChange={setSelectedCategory}
                  onTagChange={setSelectedTag}
                />
              </div>

              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <p className="body-md text-muted-foreground">
                  Mostrando{" "}
                  <span className="text-accent font-semibold">{filteredProjects.length}</span> de{" "}
                  <span className="text-accent font-semibold">{projects.length}</span> projetos
                  {selectedCategory && (
                    <>
                      {" "}
                      em <span className="text-accent">{categoryLabels[selectedCategory]}</span>
                    </>
                  )}
                  {selectedTag && (
                    <>
                      {" "}
                      com tag <span className="text-accent">"{selectedTag}"</span>
                    </>
                  )}
                </p>
              </motion.div>

              {/* Projects Grid */}
              {filteredProjects.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="heading-lg mb-2">Nenhum projeto encontrado</h3>
                  <p className="body-md text-muted-foreground mb-6">
                    Tente ajustar seus filtros para encontrar o que procura.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedCategory(undefined);
                      setSelectedTag(undefined);
                    }}
                    className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold"
                  >
                    Limpar Filtros
                  </motion.button>
                </motion.div>
              )}

              {/* Stats Section */}
              {filteredProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-20 pt-12 border-t border-border"
                >
                  <h3 className="heading-lg mb-8">Estatísticas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="bento-item p-6 text-center"
                    >
                      <p className="label text-accent mb-2">Total de Projetos</p>
                      <p className="display-lg">{stats.total}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="bento-item p-6 text-center"
                    >
                      <p className="label text-accent mb-2">Em Produção</p>
                      <p className="display-lg">{stats.production}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="bento-item p-6 text-center"
                    >
                      <p className="label text-accent mb-2">Categorias</p>
                      <p className="display-lg">{stats.categories}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="bento-item p-6 text-center"
                    >
                      <p className="label text-accent mb-2">Tecnologias</p>
                      <p className="display-lg">{stats.technologies}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-border mt-20 py-12"
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="body-md text-muted-foreground">
              Tem um projeto em mente? Vamos conversar!
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/"
              className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold"
            >
              Entrar em Contato
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
