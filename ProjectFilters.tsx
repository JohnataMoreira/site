import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ProjectCategory } from "@/lib/projects";

interface ProjectFiltersProps {
  categories: ProjectCategory[];
  tags: string[];
  selectedCategory?: ProjectCategory;
  selectedTag?: string;
  onCategoryChange: (category?: ProjectCategory) => void;
  onTagChange: (tag?: string) => void;
}

const categoryLabels: Record<ProjectCategory, string> = {
  saas: "SaaS",
  web: "Web",
  mobile: "Mobile",
  traffic: "Tráfego",
  infrastructure: "Infraestrutura",
};

export function ProjectFilters({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
}: ProjectFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Categorias */}
      <div>
        <h3 className="heading-md mb-4">Categoria</h3>
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(undefined)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 body-sm font-medium ${
              !selectedCategory
                ? "bg-accent text-accent-foreground"
                : "bg-card border border-border text-foreground hover:border-accent/50"
            }`}
          >
            Todos
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category === selectedCategory ? undefined : category)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 body-sm font-medium ${
                selectedCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border text-foreground hover:border-accent/50"
              }`}
            >
              {categoryLabels[category]}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="heading-md mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagChange(tag === selectedTag ? undefined : tag)}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 body-sm ${
                selectedTag === tag
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-accent/50"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Botão Limpar Filtros */}
      {(selectedCategory || selectedTag) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            onCategoryChange(undefined);
            onTagChange(undefined);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors body-sm font-medium"
        >
          <X className="w-4 h-4" />
          Limpar Filtros
        </motion.button>
      )}
    </motion.div>
  );
}
