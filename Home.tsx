import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Code2,
  Zap,
  Smartphone,
  TrendingUp,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

/**
 * Design System: Bento Grid Layout
 * - Dark Mode: Cinza chumbo profundo (#0f172a background, #1e293b cards)
 * - Typography: Geist Sans Serif (grotesca)
 * - Animações: Framer Motion com fade-in + slide-up
 * - Cores: Emerald (#10b981) como accent primário, Cyan (#06b6d4) como secundário
 * - Espaçamento: Gap 4-6 entre cards, padding generoso
 * - Sombras: Sutis nas bordas dos cards, hover effects elegantes
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      >
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-slate-900" />
            </div>
            <span className="heading-md">JM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="/portfolio" className="body-sm hover:text-accent transition-colors">
              Projetos
            </a>
            <a href="#sobre" className="body-sm hover:text-accent transition-colors">
              Sobre
            </a>
            <a href="#contato" className="body-sm hover:text-accent transition-colors">
              Contato
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="container py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bento-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gridAutoRows: "auto",
          }}
        >
          {/* Hero Block - 2x2 */}
          <motion.div
            variants={itemVariants}
            className="bento-item col-span-1 md:col-span-2 row-span-2 p-8 md:p-12 flex flex-col justify-between min-h-96"
            onMouseEnter={() => setHoveredCard("hero")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="label text-accent">Product Builder</span>
              </motion.div>
              <h1 className="display-xl mt-6 leading-tight">
                Código com
                <br />
                <span className="gradient-accent">Visão de Negócio</span>
              </h1>
              <p className="body-lg text-muted-foreground mt-6 max-w-md">
                Desenvolvedor Full-stack & Estrategista de Tráfego. Crio produtos que param de pé.
              </p>
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <a href="/portfolio">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2"
                >
                  Ver Projetos
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Case Real - 2x1 */}
          <motion.div
            variants={itemVariants}
            className="bento-item col-span-1 md:col-span-2 p-8 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("case")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="label bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                  Em Produção
                </span>
                <h3 className="heading-lg mt-4">Sistema de Gestão de Frotas</h3>
                <p className="body-md text-muted-foreground mt-2">
                  Grupo Paraopeba
                </p>
              </div>
              <Smartphone className="w-8 h-8 text-accent flex-shrink-0" />
            </div>
            <p className="body-md text-muted-foreground">
              Painel Web + App Mobile para controle logístico total. Dashboard em tempo real, rastreamento de frotas, gestão de motoristas e análise de rotas otimizadas.
            </p>
          </motion.div>

          {/* Laboratório - 1x1 */}
          <motion.div
            variants={itemVariants}
            className="bento-item col-span-1 p-8 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("lab")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="label text-cyan-400">SaaS</span>
                <h3 className="heading-md mt-4">MeuGuia</h3>
              </div>
              <Zap className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            </div>
            <p className="body-sm text-muted-foreground">
              Plataforma em construção para a Gig Economy. Gestão financeira e operacional para motoristas de aplicativo.
            </p>
          </motion.div>

          {/* Tráfego Pago - 1x1 */}
          <motion.div
            variants={itemVariants}
            className="bento-item col-span-1 p-8 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("traffic")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="label text-orange-400">Ads</span>
                <h3 className="heading-md mt-4">Gestão de Tráfego</h3>
              </div>
              <TrendingUp className="w-6 h-6 text-orange-400 flex-shrink-0" />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1 flex gap-1 items-end h-12">
                {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex-1 bg-gradient-to-t from-emerald-400 to-cyan-400 rounded-t-sm"
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-emerald-400">+45%</span>
            </div>
            <p className="body-sm text-muted-foreground mt-4">
              ROI focado em Imobiliárias
            </p>
          </motion.div>

          {/* Bio - 1x2 */}
          <motion.div
            variants={itemVariants}
            className="bento-item col-span-1 row-span-2 p-8 md:p-12 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("bio")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <h3 className="heading-lg mb-6">Quem Sou</h3>
              <p className="body-lg text-muted-foreground leading-relaxed">
                39 anos, Pai de 3, Ex-Comércio. Eu sei o valor de cada centavo investido em tecnologia.
              </p>
              <p className="body-lg text-muted-foreground mt-6">
                25 anos de experiência comercial. Não sou apenas um codificador; sou um estrategista de negócios.
              </p>
              <p className="body-lg text-muted-foreground mt-6 font-semibold">
                Sem tecniquês, apenas resultados.
              </p>
            </div>
            <div className="flex gap-3 pt-6">
              <a
                href="#"
                className="p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Habilidades - 1x1 */}
          <motion.div
            variants={itemVariants}
            className="bento-item col-span-1 p-8"
          >
            <h4 className="heading-md mb-6">Stack</h4>
            <div className="space-y-3">
              {[
                { label: "Frontend", value: "React, Next.js, Tailwind" },
                { label: "Backend", value: "Node.js, Express, PostgreSQL" },
                { label: "Mobile", value: "React Native, Flutter" },
                { label: "DevOps", value: "Docker, AWS, Vercel" },
              ].map((skill) => (
                <div key={skill.label}>
                  <p className="label text-accent mb-1">{skill.label}</p>
                  <p className="body-sm text-muted-foreground">{skill.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Block - 2x1 */}
          <motion.div
            variants={itemVariants}
            className="bento-item col-span-1 md:col-span-2 p-8 md:p-12 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/30"
            id="contato"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="heading-lg mb-3">Vamos Conversar?</h3>
                <p className="body-md text-muted-foreground">
                  Tenho soluções para seus desafios de negócio.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
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
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-slate-900" />
              </div>
              <span className="body-md font-semibold">Johnata Moreira</span>
            </div>
            <p className="body-sm text-muted-foreground">
              © 2026 Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="body-sm text-muted-foreground hover:text-accent transition-colors">
                GitHub
              </a>
              <a href="#" className="body-sm text-muted-foreground hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="#" className="body-sm text-muted-foreground hover:text-accent transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
