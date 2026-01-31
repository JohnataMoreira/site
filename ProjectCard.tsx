import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import * as Icons from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mapear nome do ícone para componente
  const IconComponent = (Icons as Record<string, any>)[project.icon] || Icons.Code2;

  const statusColors = {
    production: "bg-emerald-500/20 text-emerald-400",
    development: "bg-yellow-500/20 text-yellow-400",
    archived: "bg-gray-500/20 text-gray-400",
  };

  const statusLabels = {
    production: "Em Produção",
    development: "Em Desenvolvimento",
    archived: "Arquivado",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="bento-item h-full flex flex-col cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <IconComponent className="w-5 h-5 text-accent" />
              </div>
              <span className={`label px-2 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            </div>
            <h3 className="heading-md">{project.title}</h3>
            <p className="body-sm text-muted-foreground mt-2">{project.year}</p>
          </div>
        </div>

        {/* Description */}
        <p className="body-md text-muted-foreground mb-6 flex-grow">{project.description}</p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-border">
            {project.metrics.map((metric, i) => (
              <div key={i}>
                <p className="label text-accent mb-1">{metric.label}</p>
                <p className="heading-md">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-card border border-border text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Technologies */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="label text-accent mb-3">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-1 rounded text-xs bg-accent/10 text-accent">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded text-xs bg-accent/10 text-accent">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Expandable Content */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-6"
        >
          <div className="space-y-4 pb-4 border-b border-border">
            <div>
              <p className="label text-accent mb-2">Descrição Completa</p>
              <p className="body-md text-muted-foreground">{project.longDescription}</p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <p className="label text-accent mb-2">Destaques</p>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="body-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.team && (
              <div>
                <p className="label text-accent mb-2">Cliente/Time</p>
                <p className="body-md text-muted-foreground">{project.team}</p>
              </div>
            )}

            {project.technologies.length > 4 && (
              <div>
                <p className="label text-accent mb-2">Todas as Tecnologias</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded text-xs bg-accent/10 text-accent">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Links */}
        {project.links && Object.keys(project.links).length > 0 && (
          <div className="flex gap-3 pt-4 border-t border-border">
            {project.links.demo && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-center body-sm font-medium"
              >
                Ver Demo
              </motion.a>
            )}
            {project.links.website && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-center body-sm font-medium"
              >
                Website
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-center body-sm font-medium"
              >
                GitHub
              </motion.a>
            )}
          </div>
        )}

        {/* Expand Button */}
        <motion.button
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="mt-4 w-full py-2 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors text-muted-foreground hover:text-accent body-sm font-medium"
        >
          {isExpanded ? "Mostrar Menos" : "Mostrar Mais"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
